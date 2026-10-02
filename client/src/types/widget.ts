import { widgetRegistry } from "../features/widgets/widgetRegistry"

export type WidgetType = keyof typeof widgetRegistry

export type WidgetInstance = {
    id: string,
    type: WidgetType,
    position: {
        x: number,
        y: number
    },
    size: {
        width: number,
        height: number
    },
    settings: Record<string, unknown>
}

export type weatherWidgetSettings = {
    showTemperature: boolean;
    showLocation: boolean;
    showWeatherCondition: boolean;
}

export type tasksWidgetSettings = {
    showTaskCount: boolean;
    showCompleted: boolean;
}