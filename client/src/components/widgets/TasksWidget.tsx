import { getTasks } from "../../services/TasksServices";
import "./TasksWidget.css"
import { useState, useEffect } from "react";
import type { Task } from "../../services/TasksServices";
import { createTask } from "../../services/TasksServices";

export default function TasksWidget(){
    
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {

        async function loadTasks(){
            const tasksData = await getTasks();
            setTasks(tasksData.tasks);
        }

        loadTasks();
    }, []);

    async function handleCreateTask(title: string){
        if(title.trim() === "") {
            setError("Invalid Task");
            return;
        }
        try {
            const createdTask = await createTask(title);
            setTasks((previousTasks) => [...previousTasks,createdTask])
            setIsCreating(false);
            setTaskTitle("");
            return createdTask;
        }
        catch (error){
            setError("Failed to create task")
        }
    }

    if(error){
        return (<div>{error}</div>)
    }

    return(
        <div className="tasks-widget">
            <h3 className="tasks-title">
                Tasks
            </h3>
            <div className="tasks-list">
                {tasks.map((task) => (
                    <p key={task.id}>
                        {task.title}
                    </p>
                ))}
            </div>
            <div>
                <button className="new-task" onClick={() => setIsCreating(true)}>
                    New Task
                </button>

                {isCreating && (<input type="text" value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)}/>)}
            </div>
            {isCreating && (
                <div>
                    <button className="add-task" onClick={() => handleCreateTask(taskTitle)}>
                        Add Task
                    </button>
                </div>
            )}
        </div>
    );
}