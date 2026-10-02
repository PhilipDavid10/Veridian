import { EllipsisVertical } from "lucide-react"
import type { ReactNode } from "react"
import "./WidgetContainer.css"

type WidgetContainerProps = {
    children: ReactNode;
}

export default function WidgetContainer({ children }: WidgetContainerProps){
    return(
        <div className="widget-container">
            <div className="widget-container-header">
                <h3 className="widget-title">
                    Widget Title
                </h3>
                <div>
                    <EllipsisVertical className="widget-settings"/>
                </div>
            </div>
            
            <div className="widget-content">
                {children}
            </div>
        </div>
    )
}