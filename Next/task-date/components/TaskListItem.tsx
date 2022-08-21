import { NetworkStatus, Reference } from '@apollo/client';
import Link from 'next/link';
import React, {useEffect} from 'react';
import { Task, TaskStatus, useDeleteTaskMutation, useUpdateTaskMutation } from '../generated/graphql-frontend';

interface Props {
    task: Task,
    status: boolean
}


const TaskListItem: React.FC<Props> = ({task, status}) => {

    const [deleteTask, {loading, error}] = useDeleteTaskMutation(
        {variables:{id: task.id},
        errorPolicy: 'all',
        update: (cache, result) => {

            const deletedTask = result.data?.deleteTask;

            if(deletedTask){
                cache.modify({
                    fields: {
                        tasks(taskRefs: Reference[], {readField}) {
                        return taskRefs.filter((taskRef) => {
                            return readField('id', taskRef) !== deletedTask.id;
                        });
                    },
                  }
                })
            }
        }
        });

    const handleDeleteClick = async () =>{

        try {
            await deleteTask();
        }catch(e){

        }

    }

    useEffect(() =>{
        if(error){
            alert('An error occurred, please try again.');
        }
    })

    const [updateTask, {loading: updateTaskLoading, error: updateTaskError }] = useUpdateTaskMutation({errorPolicy: 'all'});

    const handleStatusChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const newStatus = e.target.checked ? TaskStatus.Completed : TaskStatus.Active;
        
    let   result =  updateTask({variables: {input: { id: task.id, status: newStatus }},
            errorPolicy:"all",
        update: (cache, result) => {

            const updatedTask = result.data?.updateTask;

            if(updatedTask && !status){
                cache.modify({
                    fields: {
                        tasks(taskRefs: Reference[], {readField}) {
                        return taskRefs.filter((taskRef) => {
                            return readField('id', taskRef) !== updatedTask.id;
                        });
                    },
                  }
                })
            }
        }})

    }

    useEffect(()=>{
        if(updateTaskError){
            alert('An error occured')
        }
    })

    return (
            <li className="task-list-item" key={task.id}>
                <label className="checkbox">
                    <input type="checkbox" 
                            onChange={handleStatusChange}
                            checked={task.status === TaskStatus.Completed} 
                            disabled={updateTaskLoading}
                            />
                    <span className="checkbox-mark">&#10003;</span>
                </label>
                <Link href="/update/[id]" as={`/update/${task.id}`}>
              <a className="task-list-item-title">{task.title}</a> 
              </Link>
              ({task.status})
              <button className='task-list-item-delete' disabled={loading} onClick={handleDeleteClick}>&times;</button>
            </li>
    )
};

export default TaskListItem;