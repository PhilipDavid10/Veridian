import AddButton from "../AddButton";
import "./Dashboard.css"
import { useState } from "react"
import type { WidgetType, WidgetInstance } from "../../types/widget";
import { widgetRegistry } from "../../features/widgets/widgetRegistry";
import getWidgetSettings from "../../features/widgets/widgetSettings";
import WidgetContainer from "../widgets/WidgetContainer";
import { widgetDefintions } from "../../features/widgets/widgetDefintions";

export default function Dashboard(){

    const[widgets, setWidgets] = useState<WidgetInstance[]>([]);

    function loadWidget(widgetName: WidgetType): void{
        const definition = widgetDefintions.find((definition) => definition.type === widgetName);
        
        if(!definition) {
            return;
        }

        const newWidget : WidgetInstance = {
            id: crypto.randomUUID(),
            type: widgetName,
            position: {
                x:0,
                y:0
            },
            size: definition.defaultSize,
            settings: {... definition.defaultSettings},
        }

        setWidgets((currentWidgets) => [...currentWidgets,newWidget]);
        console.log(newWidget); 
    }

    return(
        <main className="dashboard-page">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-greeting">Welcome Back! Here's your personal workspace</p>
            <AddButton loadWidget={loadWidget}/>
            <div className="widget-area">
                
                {widgets.map((widget) => {
                    const Widget = widgetRegistry[widget.type];
                    return (
                        <WidgetContainer key={widget.id} size={widget.size}>
                            <Widget />
                        </WidgetContainer>
                    )
                })}
            </div>
        </main>
    );
}