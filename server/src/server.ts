import http from "http";
import { randomUUID } from "crypto";

type Weather = {
    name: string;
    country: string;
    localtime: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    }
}

const server = http.createServer((req,res) => {
    console.log(req.method, req.url);
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const parts = url.pathname.split('/');
    if (url.pathname === "/api/weather"){
        weatherHandler(req,res,url);
    }
    else if (url.pathname === "/api/tasks"){
        tasksHandler(req,res,url);
    }
    else if (parts[1] === "api" && parts[2] === "tasks" && parts[3] && !parts[4]){
        tasksHandler(req,res,url,parts[3])
    }
    else {
        res.writeHead(404,{"content-type":"application/json"});
        res.write(JSON.stringify({error:"Webpage cannot be found"}));
        res.end();
    }
})

function buildUrl(location: string) : string {
    return `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
}

async function getWeather(location: string){
    const url = buildUrl(location);
    const response = await fetch(url);

    if (!response.ok) {
        throw new WeatherError(response.status, "Weather API request failed");
    }
    const json = await response.json()
    const weather: Weather = {
        name: json.location.name,
        country: json.location.country,
        localtime: json.location.localtime,
        temp_c: json.current.temp_c,
        condition: {
            text: json.current.condition.text,
            icon: `https:${json.current.condition.icon}`
        }

    }

    return weather
}

server.listen(3000, () => { 
    console.log("Server running on port 3000")
});

class WeatherError extends Error{

    statusCode: number

    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
    }
}

async function weatherHandler(req: http.IncomingMessage, res: http.ServerResponse, url: URL){
    const location = url.searchParams.get("location");

    if(req.method !== 'GET') {
        res.writeHead(405,{"content-type":"application/json"});
        res.write(JSON.stringify({error: "Method not allowed"}));
        res.end();
        return;
    }

    if(!location) {
        res.writeHead(400, {"content-type":"application/json"});
        res.write(JSON.stringify({error:"Location is required"}))
        res.end();
        return;
    }

    try {
        const weather = await getWeather(location);
        
        res.writeHead(200, {"content-type":"application/json"});
        res.write(JSON.stringify(weather));
        res.end();
    }
    catch (error) {
        if (error instanceof WeatherError) {
            res.writeHead(error.statusCode, {"content-type":"application/json"});
            res.write(JSON.stringify({error: error.message}));
            res.end();
        }
        else {
            const errorResponse = {
                error: "Internal Server Error"
            }
            res.writeHead(500, {"content-type":"application/json"});
            res.write(JSON.stringify(errorResponse));
            res.end();
        }
    }
}

let tasks = [
    {
        "id": "1",
        "title": "Finish learning node",
    },
    {
        "id": "2",
        "title": "Build Veridian",
    },
]

async function tasksHandler(req: http.IncomingMessage, res: http.ServerResponse, url: URL, id?: string){
    
    if (req.method === 'GET') {
        try{
            res.writeHead(200, {"content-type":"application/json"});
            res.write(JSON.stringify({tasks}));
            res.end();
        }
        catch (error) {
            const errorResponse = {
                error: "Internal Server Error"
            }
            res.writeHead(500, {"content-type":"application/json"});
            res.write(JSON.stringify(errorResponse));
            res.end();
        }
    }
    else if (req.method === 'POST'){
        let data = '';
        req.on('data',chunk => {
            data += chunk.toString();
        });

        req.on('end', () => {
            try{
                const task = JSON.parse(data);

                if (task === null || typeof task !== 'object' || Array.isArray(task)) {
                    res.writeHead(400, {"content-type":"application/json"});
                    res.write(JSON.stringify({error: "Request body must be a JSON object"}));
                    res.end();
                    return;
                }
                
                if (typeof task.title !== 'string'){
                    res.writeHead(400, {"content-type":"application/json"});
                    res.write(JSON.stringify({error: "Title must be a string"}));
                    res.end();
                    return;
                }
    
                if (!task.title || !task.title.trim()) {
                    res.writeHead(400, {"content-type":"application/json"});
                    res.write(JSON.stringify({error:"Title is required"}));
                    res.end();
                    return;
                }
    
                const createTask = {
                    id: randomUUID(),
                    title: task.title
                }
    
                tasks.push(createTask);
                res.writeHead(201, {"content-type":"application/json"});
                res.write(JSON.stringify(createTask));
                res.end();
            }
            catch (error) {
                res.writeHead(400, {"content-type":"application/json"});
                res.write(JSON.stringify({error: "Invalid JSON"}));
                res.end();
            }
        })
    }
    else if (req.method === 'PATCH') {
        if (!id) {
            res.writeHead(400, {"content-type":"application/json"});
            res.write(JSON.stringify({error:"No task id"}));
            res.end();
            return;
        }

        const task = tasks.find((task) => task.id === id)

        if (!task) {
            res.writeHead(404, {"content-type":"application/json"});
            res.write(JSON.stringify({error:"Task not found"}));
            res.end();
            return;
        }

        let data = '';
        req.on('data',chunk => {
            data += chunk.toString();
        });

        req.on('end', () => {
            try{
                const updateData = JSON.parse(data);

                if (updateData === null || typeof updateData !== 'object' || Array.isArray(updateData)) {
                    res.writeHead(400, {"content-type":"application/json"});
                    res.write(JSON.stringify({error: "Request body must be a JSON object"}));
                    res.end();
                    return;
                }
                
                if (typeof updateData.title !== 'string'){
                    res.writeHead(400, {"content-type":"application/json"});
                    res.write(JSON.stringify({error: "Title must be a string"}));
                    res.end();
                    return;
                }
    
                if (!updateData.title || !updateData.title.trim()) {
                    res.writeHead(400, {"content-type":"application/json"});
                    res.write(JSON.stringify({error:"Title is required"}));
                    res.end();
                    return;
                }

                task.title = updateData.title

                res.writeHead(200, {"content-type":"application/json"});
                res.write(JSON.stringify(({task})));
                res.end();
            }   
            catch (error) {
                res.writeHead(400, {"content-type":"application/json"});
                res.write(JSON.stringify({error:"invalid JSON"}));
                res.end();
            }
        })
    }
    else if(req.method === 'DELETE') {
        if (!id) {
            res.writeHead(400, {"content-type":"application/json"});
            res.write(JSON.stringify({error:"No task id"}));
            res.end();
            return;
        }
        
        const task = tasks.find((task) => task.id === id)

        if (!task) {
            res.writeHead(404, {"content-type":"application/json"});
            res.write(JSON.stringify({error:"Task not found"}));
            res.end();
            return;
        }

        const filteredTasks = tasks.filter((task) => task.id !== id)

        tasks = filteredTasks

        res.writeHead(204);
        res.end();
    }
    else {
        res.writeHead(405,{"content-type":"application/json"});
        res.write(JSON.stringify({error: "Method not allowed"}));
        res.end();
        return;
    }
}