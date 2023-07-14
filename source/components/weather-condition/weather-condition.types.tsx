import { WeatherConditionInfo } from "../../core/weather-info";

export interface WeatherConditionProps {
    id?: string;
    className?: string;
    weather: WeatherConditionInfo[];
    temperature: number;
}
