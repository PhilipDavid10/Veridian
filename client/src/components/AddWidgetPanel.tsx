import { Cloud, ListTodo } from "lucide-react";
import "./AddWidgetPanel.css"

export default function AddWidgetPanel(){

    const widgetOptions = [
        {
            name: "weather",
            description: "Displays the current weather",
            icon: Cloud
        },
        {
            name: "tasks",
            description: "View your tasks",
            icon: ListTodo
        }

    ]

    return(
        <>
            <div className="widget-panel">
                <h3> Add Widget </h3>
                {widgetOptions.map(option => {
                    return(
                        <>
                            <button className="widget-option">
                                <div className="widget-header">
                                    <option.icon className="widget-icon"/>
                                    <span> {option.name} </span>
                                </div>
                            </button> 
                        </>
                    )
                })}
            </div>
        </>
    );


}
