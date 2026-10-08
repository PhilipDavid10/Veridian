import { getWeatherData } from "../../services/WeatherService";
import "./WeatherWidget.css"
import { useState, useEffect } from "react";
import type { Weather } from "../../services/WeatherService";

export default function WeatherWidget (){

    const [weather, setWeather] = useState<Weather | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadWeather(){
            try{
                const weatherData = await getWeatherData("Bath");
                setWeather(weatherData)
            }
            catch (error) {
                setError("Failed to load weather");
            }
        }

        loadWeather();
    }, []);

    if (error) {
        return <div>{error}</div>
    }

    if(!weather){
        return <div>loading weather...</div>
    }

    return(
        <div className="weather-widget">
            <h3 className="weather-widget-title">
                Weather
            </h3>
            <div className="weather-widget-content">
                <div className="weather-info">
                    <p className="weather-temperature">{weather.temp_c}°C</p>   
                    <p className="weather-location">{weather.name}</p>
                    <p className="weather-condition">{weather.condition.text}</p>
                </div>
                <div>
                    <img src={weather.condition.icon} alt={weather.condition.text} />
                    
                </div>
            </div>
        </div>
    );
}