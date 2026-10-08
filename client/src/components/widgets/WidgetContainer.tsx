import { EllipsisVertical } from "lucide-react"
import type { ReactNode } from "react"
import "./WidgetContainer.css"

type WidgetContainerProps = {
    children: ReactNode;
    title: string;
    size: {
        width: number,
        height: number
    }
}

export default function WidgetContainer({ children, size, title }: WidgetContainerProps){
    return(
        <div className="widget-container"  style ={{gridColumn: `span ${size.width}`, gridRow: `span ${size.height}`}}>
            <div className="widget-content">
                {children}
            </div>
        </div>
    )
}