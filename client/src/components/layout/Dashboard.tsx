import AddButton from "../AddButton";
import "./Dashboard.css"
import { useState } from "react"
import WeatherWidget from "../widgets/WeatherWidget";
import TasksWidget from "../widgets/TasksWidget";


export default function Dashboard(){

    const[widgets, setWidgets] = useState<string[]>([]);

    function loadWidget(widgetName: string): void{
        setWidgets([...widgets,widgetName])
    }   

    return(
        <main className="dashboard-page">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-greeting">Welcome Back! Here's your personal workspace</p>
            <AddButton loadWidget={loadWidget}/>
            <div className="widget-container">
                {widgets.map((widget,index) => {
                    switch (widget) {
                        case "weather":
                            return <WeatherWidget />
                        case "tasks":
                            return <TasksWidget />
                    }
                })}
            </div>
        </main>
    );
}