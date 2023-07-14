import { useRef, useState, ReactElement, useMemo } from "react";

import { Value, HorizontalList } from "../../components/styles";
import {
    ForecastProps,
    ChartData,
    CanvasInfo,
    ForecastCanvasType,
} from "./forecast.types";
import { ForecastItem, DateDisplay, WeatherList } from "./forecast.styles";
import { ForecastInfo } from "../../core/weather-info";
import { ListItem } from "../../components/list-item";
import { WeatherCondition } from "../../components/weather-condition";
import { Chart } from "./chart/chart";
import { Wind } from "../../components/wind";

function buildData(info: ForecastInfo) {
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
            <ForecastItem key={a} className="weatherItem">
                <DateDisplay className="date">{item.dt_txt}</DateDisplay>
                <WeatherCondition
                    temperature={item.main.temp}
                    weather={item.weather}
                />
                <div>
                    <span>Humidity: </span>
                    <Value className="value">{item.main.humidity}</Value> %
                </div>
                <div>
                    <span>Pressure: </span>
                    <Value className="value">{item.main.pressure}</Value> hPa
                </div>
                <Wind
                    speed={item.wind.speed}
                    degree={item.wind.deg ?? 0}
                    canvasWidth={15}
                    canvasHeight={15}
                />
            </ForecastItem>
        );
    }

    return {
        list,
        chart: {
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
        },
    };
}

export function Forecast({ info }: ForecastProps) {
    const built = useMemo(
        () => buildData(info),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [info.city.name, info.city.country]
    );

    const chartData = useRef<ChartData>(built.chart);
    const weatherList = useRef<ReactElement<HTMLElement>[]>(built.list);

    const [canvasInfo, setCanvasInfo] = useState<CanvasInfo>(
        getInfoFrom(ForecastCanvasType.temperature)
    );

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
            <HorizontalList className="horizontalList">
                <ListItem
                    testId="Forecast_temperature"
                    onClick={showTemperature}
                    selected={
                        canvasInfo.type === ForecastCanvasType.temperature
                    }
                >
                    Temperature
                </ListItem>
                <ListItem
                    testId="Forecast_humidity"
                    onClick={showHumidity}
                    selected={canvasInfo.type === ForecastCanvasType.humidity}
                >
                    Humidity
                </ListItem>
                <ListItem
                    testId="Forecast_pressure"
                    onClick={showPressure}
                    selected={canvasInfo.type === ForecastCanvasType.pressure}
                >
                    Pressure
                </ListItem>
                <ListItem
                    testId="Forecast_windSpeed"
                    onClick={showWindSpeed}
                    selected={canvasInfo.type === ForecastCanvasType.windSpeed}
                >
                    Wind speed
                </ListItem>
            </HorizontalList>
            <Chart
                data={canvasInfo.canvas.data}
                unit={canvasInfo.canvas.unit}
                title={canvasInfo.canvas.title}
                xAxis={chartData.current!.xAxis}
            />
            <WeatherList id="WeatherList">{weatherList.current}</WeatherList>
        </div>
    );
}
