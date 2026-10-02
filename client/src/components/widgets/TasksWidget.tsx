import { getTasks } from "../../services/TasksServices";
import "./TasksWidget.css"
import { useEffect } from "react";

export default function TasksWidget(){

    useEffect(() => {
        async function loadTasks(){
            const tasksData = await getTasks();
        }

        loadTasks();
    }, []);

    return(
        <div className="tasks-widget">
            <h3 className="tasks-title">
                Tasks
            </h3>
            <p>
                placeholder text
            </p>
        </div>
    );
}