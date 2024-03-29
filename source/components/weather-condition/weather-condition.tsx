import { Value } from "../styles";
import { WeatherConditionProps } from "./weather-condition.types";
import { ConditionImage } from "./weather-condition.styles";

/**
 * Shows the given temperature plus the associated weather condition (represented by an image).
 */
export function WeatherCondition({
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
            <Value className="temperatureValue">{temperature}</Value> °C
        </div>
    );
}
