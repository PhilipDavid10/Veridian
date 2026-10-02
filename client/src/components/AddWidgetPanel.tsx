import { widgetDefintions} from "../features/widgets/widgetDefintions"
import type { WidgetType } from "../types/widget";
import "./AddWidgetPanel.css"

type AddWidgetPanelProps = {
    loadWidget: (widgetName: WidgetType) => void;
};

export default function AddWidgetPanel({ loadWidget} : AddWidgetPanelProps){

    return(
        <>
            <div className="widget-panel">
                <h3> Add Widget </h3>
                {widgetDefintions.map(widget => {
                    return(

                        <button key = {widget.type} className="widget-option" onClick={() => loadWidget(widget.type)}>
                            <div className="widget-button">
                                <widget.icon className="widget-icon"/>
                                <span> {widget.type} </span>
                            </div>
                        </button> 
                    )
                })}
            </div>
        </>
    );


}
