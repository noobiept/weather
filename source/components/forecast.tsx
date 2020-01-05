import React, { useRef, useState } from "react";

import Chart from "./chart";
import { ForecastInfo } from "../shared/weather_info";
import WeatherCondition from "./weather_condition";
import Wind from "./wind";

interface ForecastProps {
    info: ForecastInfo;
}

interface CanvasInfo {
    type: ForecastCanvasType;
    canvas: {
        data: number[];
        unit: string;
        title: string;
    };
}

enum ForecastCanvasType {
    temperature,
    humidity,
    pressure,
    windSpeed,
}

interface ChartInfo {
    data: number[];
    unit: string;
    title: string;
}

interface ChartData {
    info: {
        temperature: ChartInfo;
        humidity: ChartInfo;
        pressure: ChartInfo;
        windSpeed: ChartInfo;
        [type: string]: ChartInfo;
    };
    xAxis: Date[];
}

export default function Forecast({ info }: ForecastProps) {
    const chartData = useRef<ChartData>();
    const weatherList = useRef<React.ReactElement<HTMLElement>[]>();

    buildData();

    const [canvasInfo, setCanvasInfo] = useState<CanvasInfo>(
        getInfoFrom(ForecastCanvasType.temperature)
    );

    function buildData() {
        if (!chartData.current) {
            const list = [];
            const temperatureData = [];
            const humidityData = [];
            const pressureData = [];
            const windSpeedData = [];
            const xAxis = [];

            for (let a = 0; a < info.list.length; a++) {
                const item = info.list[a];

                // get the hour/minute from each item, to be displayed on the chart later on
                const timestamp = item.dt * 1000; // comes in seconds, so we convert to milliseconds to be used by the 'Date' class
                const date = new Date(timestamp);

                // round some of the values that are shown on the chart (so they occupy less space)
                // the original value is still available on the list
                const roundedTemperature = Math.round(item.main.temp);
                const roundedPressure = Math.round(item.main.pressure);

                temperatureData.push(roundedTemperature);
                humidityData.push(item.main.humidity);
                pressureData.push(roundedPressure);
                windSpeedData.push(item.wind.speed);
                xAxis.push(date);

                list.push(
                    <div key={a} className="weatherItem">
                        <div className="date">{item.dt_txt}</div>
                        <WeatherCondition
                            temperature={item.main.temp}
                            weather={item.weather}
                        />
                        <div>
                            <span>Humidity: </span>
                            <span className="value">
                                {item.main.humidity}
                            </span>{" "}
                            %
                        </div>
                        <div>
                            <span>Pressure: </span>
                            <span className="value">
                                {item.main.pressure}
                            </span>{" "}
                            hPa
                        </div>
                        <Wind
                            speed={item.wind.speed}
                            degree={item.wind.deg}
                            canvasWidth={15}
                            canvasHeight={15}
                        />
                    </div>
                );
            }

            weatherList.current = list;
            chartData.current = {
                xAxis: xAxis,
                info: {
                    temperature: {
                        data: temperatureData,
                        unit: "°C",
                        title: "Temperature",
                    },
                    humidity: {
                        data: humidityData,
                        unit: "%",
                        title: "Humidity",
                    },
                    pressure: {
                        data: pressureData,
                        unit: "hPa",
                        title: "Pressure",
                    },
                    windSpeed: {
                        data: windSpeedData,
                        unit: "m/s",
                        title: "Wind speed",
                    },
                },
            };
        }
    }

    function showInCanvas(type: ForecastCanvasType) {
        if (type === canvasInfo.type) {
            return;
        }

        setCanvasInfo(getInfoFrom(type));
    }

    function getInfoFrom(type: ForecastCanvasType) {
        const typeStr = ForecastCanvasType[type];

        return { canvas: chartData.current!.info[typeStr], type };
    }

    const cssClasses = {
        temperature: "button",
        humidity: "button",
        pressure: "button",
        windSpeed: "button",
    };

    switch (canvasInfo.type) {
        case ForecastCanvasType.temperature:
            cssClasses.temperature += " selected";
            break;

        case ForecastCanvasType.humidity:
            cssClasses.humidity += " selected";
            break;

        case ForecastCanvasType.pressure:
            cssClasses.pressure += " selected";
            break;

        case ForecastCanvasType.windSpeed:
            cssClasses.windSpeed += " selected";
            break;
    }

    const showTemperature = () => {
        showInCanvas(ForecastCanvasType.temperature);
    };
    const showHumidity = () => {
        showInCanvas(ForecastCanvasType.humidity);
    };
    const showPressure = () => {
        showInCanvas(ForecastCanvasType.pressure);
    };
    const showWindSpeed = () => {
        showInCanvas(ForecastCanvasType.windSpeed);
    };

    return (
        <div id="Forecast">
            <h1>Forecast</h1>
            <ul className="horizontalList">
                <li
                    id="Forecast_temperature"
                    onClick={showTemperature}
                    className={cssClasses.temperature}
                >
                    Temperature
                </li>
                <li
                    id="Forecast_humidity"
                    onClick={showHumidity}
                    className={cssClasses.humidity}
                >
                    Humidity
                </li>
                <li
                    id="Forecast_pressure"
                    onClick={showPressure}
                    className={cssClasses.pressure}
                >
                    Pressure
                </li>
                <li
                    id="Forecast_windSpeed"
                    onClick={showWindSpeed}
                    className={cssClasses.windSpeed}
                >
                    Wind speed
                </li>
            </ul>
            <Chart
                data={canvasInfo.canvas.data}
                unit={canvasInfo.canvas.unit}
                title={canvasInfo.canvas.title}
                xAxis={chartData.current!.xAxis}
            />
            <div id="WeatherList">{weatherList.current}</div>
        </div>
    );
}
