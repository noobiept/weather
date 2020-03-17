import React from "react";
import styled from "styled-components";

import { WeatherConditionInfo } from "../shared/weather_info";
import { Value } from "../shared/styles";

const ConditionImage = styled.img`
    width: 50px;
    height: 50px;
    vertical-align: middle;
`;

interface WeatherConditionProps {
    id?: string;
    className?: string;
    weather: WeatherConditionInfo[];
    temperature: number;
}

/**
 * Shows the given temperature plus the associated weather condition (represented by an image).
 */
export default function WeatherCondition({
    id,
    className,
    weather,
    temperature,
}: WeatherConditionProps) {
    const weatherInfo = weather.map((info, index) => {
        return (
            <ConditionImage
                className="weatherCondition"
                key={index}
                title={info.description}
                src={`https://openweathermap.org/img/w/${info.icon}.png`}
            />
        );
    });

    return (
        <div id={id} className={className}>
            {weatherInfo}
            <span>Temperature: </span>
            <Value className="value">{temperature}</Value> °C
        </div>
    );
}
