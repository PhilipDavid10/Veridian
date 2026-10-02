import { Cloud, ListTodo } from "lucide-react"
import getDayOfTheWeek from "../../utils/date"
import type { WidgetType } from "../../types/widget"
import type { weatherWidgetSettings, tasksWidgetSettings } from "../../types/widget";

type weatherWidgetDefintion = {
    type: "weather";
    icon: typeof Cloud;
    location: string;
    temperature: string;
    weatherCondition: string;
    settings: weatherWidgetSettings;
};

type TasksWidgetDefintion = {
    type: "tasks";
    icon: typeof ListTodo;
    title: string;
    taskCount: number;
    tasks: {
        title: string,
        completed: boolean;
    }[];
    settings: tasksWidgetSettings;
}

type widgetDefintion = 
        | weatherWidgetDefintion
        | TasksWidgetDefintion


export const widgetDefintions: widgetDefintion[] = [
        {
            type: "weather",
            icon: Cloud,
            location: getDayOfTheWeek(),
            temperature: "22°C",
            weatherCondition: "Partially Cloudy",
            settings: {
                showLocation: true,
                showTemperature: true,
                showWeatherCondition: true,
            }
        },
        {
            type: "tasks",
            title: "To Do List Tasks",
            icon: ListTodo,
            taskCount: 3,
            tasks: [
                {
                    title: "finish algebra homework",
                    completed: false
                },
                {
                    title: "go shopping",
                    completed: false
                },
                {
                    title: "Do the Laundry",
                    completed: true
                }
            ],
            settings: {
                showTaskCount: true,
                showCompleted: true,
            }
        }

    ]