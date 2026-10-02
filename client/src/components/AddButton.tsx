import { Plus } from "lucide-react";
import "./AddButton.css";
import { useState } from "react"
import AddWidgetPanel from "./AddWidgetPanel";
import type { WidgetType } from "../types/widget";

type AddButtonProps = {
    loadWidget: (widgetName: WidgetType) => void;
};

function AddButton({ loadWidget }: AddButtonProps){
    const[showWidgetPanel,setShowWidgetPanel] = useState(false);

    function handleClick(){
        setShowWidgetPanel(!showWidgetPanel);
    }

    return(
        <>
            <div className="add-button-container">
                <button className="add-button" onClick={handleClick}>
                    <Plus />
                </button>
                {showWidgetPanel && <AddWidgetPanel loadWidget={loadWidget}/>}
            </div>
        </>
    );
}

export default AddButton