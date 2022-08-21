import Link from "next/link";
import React from "react";
import { Task, TaskStatus } from "../generated/graphql-frontend";
import TaskListItem from "./TaskListItem";

interface Props {
    tasks: Task
    all: boolean
}

const TaskList: React.FC<Props> = ({tasks, all}) => {
    return(
        <ul className="task-list">
          {tasks.map((task) => {
          return (
            <TaskListItem key={task.id} task={task} status={all}/>
          );
        })}
        </ul>
    )
}

export default TaskList;