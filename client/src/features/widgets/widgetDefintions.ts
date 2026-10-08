import { ListTodo, Cloud } from "lucide-react";
import type { weatherWidgetSettings, tasksWidgetSettings } from "../../types/widget";

type WidgetSize = {
    width: number,
    height: number
}

type weatherWidgetDefintion = {
    type: "weather";
    name: "weather";
    icon: typeof Cloud;
    defaultSize: WidgetSize,
    defaultSettings: weatherWidgetSettings;
};

type TasksWidgetDefintion = {
    type: "tasks";
    name: "tasks";
    icon: typeof ListTodo;
    defaultSize: WidgetSize,
    defaultSettings: tasksWidgetSettings;
}
type widgetDefintion = 
        | weatherWidgetDefintion
        | TasksWidgetDefintion


export const widgetDefintions: widgetDefintion[] = [
        {
            type: "weather",
            name: "weather",
            icon: Cloud,
            defaultSize: {
                width: 2,
                height: 1
            },
            defaultSettings: {
                showLocation: true,
                showTemperature: true,
                showWeatherCondition: true,
            }
        },
        {
            type: "tasks",
            name: "tasks",
            icon: ListTodo,
            defaultSize: {
                width: 1,
                height: 1
            },
            defaultSettings: {
                showTaskCount: true,
                showCompleted: true,
            }
        }

    ]