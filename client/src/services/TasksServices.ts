export type Task = {
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

export async function createTask(title: string){
    const response = await fetch("/api/tasks",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({title})
    })

    if(!response.ok){
        throw new Error(`response error: ${response.status}`);
    }

    const result = await response.json();
    return result;
}