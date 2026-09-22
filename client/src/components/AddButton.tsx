import { Plus } from "lucide-react";
import "./AddButton.css";
import { useState } from "react"
import AddWidgetPanel from "./AddWidgetPanel";

function AddButton(){
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
                {showWidgetPanel && <AddWidgetPanel />}
            </div>
        </>
    );
}

export default AddButton