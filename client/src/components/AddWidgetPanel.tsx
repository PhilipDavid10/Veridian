import { Cloud, ListTodo } from "lucide-react";
import "./AddWidgetPanel.css"

type AddWidgetPanelProps = {
    loadWidget: (widgetName: string) => void;
};

export default function AddWidgetPanel({ loadWidget} : AddWidgetPanelProps){

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
                            <button className="widget-option" onClick={() => loadWidget(option.name)}>
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
