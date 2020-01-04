import React from "react";
import { WeatherConditionInfo } from "../shared/weather_info";

interface WeatherConditionProps {
    id?: string;
    weather: WeatherConditionInfo[];
    temperature: number;
}

/**
 * Shows the given temperature plus the associated weather condition (represented by an image).
 */
export default function WeatherCondition({
    id,
    weather,
    temperature,
}: WeatherConditionProps) {
    const weatherInfo = weather.map((info, index) => {
        return (
            <img
                className="weatherCondition"
                key={index}
                title={info.description}
                src={`https://openweathermap.org/img/w/${info.icon}.png`}
            />
        );
    });

    return (
        <div id={id}>
            {weatherInfo}
            <span>Temperature: </span>
            <span className="value">{temperature}</span> °C
        </div>
    );
}
