import { Resolvers, Task, TaskStatus } from '../generated/graphql-backend'
import mysql from 'serverless-mysql';
import { OkPacket } from 'mysql';
import { UserInputError } from 'apollo-server-micro';


interface ApolloContext  {
  db: mysql.ServerlessMysql;
}

interface TaskDbRow {
  id: number;
  title: string;
  task_status: TaskStatus;
}


type TasksDbQueryResult = TaskDbRow[];
type TaskDbQueryResult = TaskDbRow[];

const getTaskById = async (id: number, db: mysql.ServerlessMysql) => {
  const tasks = await db.query<TaskDbQueryResult>('SELECT id, title, task_status FROM tasks WHERE id = ?', [
        id
      ]);

      return tasks.length ? {
        id: tasks[0].id,
        title: tasks[0].title,
        status: tasks[0].task_status
      }:
      null;
}

export const resolvers : Resolvers<ApolloContext> = {
  Query: {

    async tasks(parent, args, context){
      const { status } = args;
      const queryParams: string[] = [];
      let query = 'SELECT id, title, task_status FROM tasks ';

      if(status){
        query += 'WHERE task_status = ?';
        queryParams.push(status);
      }

      const result = await context.db.query<TasksDbQueryResult>(query, queryParams);
      await context.db.end();
      return result.map(({id, title, task_status}) => ({id, title, status: task_status}));
    },
    async task(parent, args, context){
      return await getTaskById(args.id, context.db);
    }
  },
  Mutation: {
    async createTask(parent, args, context): Promise<Task> {
      const result = await context.db.query<OkPacket>('INSERT INTO tasks (title, task_status) VALUES (?, ?)', 
      [args.input.title, TaskStatus.Active]);
       await context.db.end();

      return {
        id: result.insertId,
        title: args.input.title,
        status: TaskStatus.Active
      };
    },
    async updateTask(parent, args, context){
      const columns: string[] = [];
      const sqlParams: any[] = [];

      if(args.input.title){
        columns.push('title = ?');
        sqlParams.push(args.input.title);
      }

      if(args.input.status){
        columns.push('task_status = ?');
        sqlParams.push(args.input.status);
      }

      sqlParams.push(args.input.id);

      await context.db.query(`UPDATE tasks SET ${columns.join(',')} WHERE id = ?`,
      sqlParams);
      await context.db.end();

      return await getTaskById(args.input.id, context.db);

    },
    async deleteTask(parent, args, context){

      const task = await getTaskById(args.id, context.db);

      if(!task){

        throw new UserInputError('Could not find your task. ')

      }else{
        await context.db.query('DELETE FROM tasks WHERE id = ?', [args.id]);

        return task;
      }
    }
  }
};