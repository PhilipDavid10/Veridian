export type Weather = {
    name: string;
    country: string;
    localtime: string;
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    }
}

export async function getWeatherData(location: string){
    const url = `/api/weather?location=${encodeURIComponent(location)}`;
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error(`response status: ${response.status}`)
    }

    const result = await response.json();
    return result;
}