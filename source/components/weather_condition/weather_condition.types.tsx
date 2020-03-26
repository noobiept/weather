import { WeatherConditionInfo } from "../../shared/weather_info";

export interface WeatherConditionProps {
    id?: string;
    className?: string;
    weather: WeatherConditionInfo[];
    temperature: number;
}
