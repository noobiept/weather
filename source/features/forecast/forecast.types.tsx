import { ForecastInfo } from "../../core/weather-info";

export interface ForecastProps {
    info: ForecastInfo;
}

export interface CanvasInfo {
    type: ForecastCanvasType;
    canvas: {
        data: number[];
        unit: string;
        title: string;
    };
}

export enum ForecastCanvasType {
    temperature,
    humidity,
    pressure,
    windSpeed,
}

export interface ChartInfo {
    data: number[];
    unit: string;
    title: string;
}

export interface ChartData {
    info: {
        temperature: ChartInfo;
        humidity: ChartInfo;
        pressure: ChartInfo;
        windSpeed: ChartInfo;
        [type: string]: ChartInfo;
    };
    xAxis: Date[];
}
