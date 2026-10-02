import type { WidgetType } from "../../types/widget";

export default function getWidgetSettings(widget: WidgetType) {
    if(widget === "weather") {
        return {
            showLocation: true,
            showweatherCondition: true,
            showTemperature: true,
    }}
    else if (widget === "tasks") {
        return{
            showCompleted: true,
            showTasksCount: true,
        }
    }
    return {}
}