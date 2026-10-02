type Task = {
    id: string;
    title: string;
}

type TaskResponse = {
    tasks: Task[];
}

export async function getTasks(){
    const url = "/api/tasks"
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`response status: ${response.status}`);
    }

    const result : TaskResponse = await response.json();
    return result;
}