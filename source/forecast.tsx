import React from "react";

import Chart from "./chart";
import { ForecastInfo } from "./weather_info";
import WeatherCondition from "./weather_condition";
import Wind from "./wind";

interface ForecastProps {
    info: ForecastInfo;
}

interface ForecastState {
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
    state: {
        data: number[];
        unit: string;
        title: string;
    };
    changeChartType: () => void;
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

export default class Forecast extends React.Component<
    ForecastProps,
    ForecastState
> {
    chartData: ChartData;
    weatherList: React.ReactElement<HTMLDivElement>[];
    canvasType: ForecastCanvasType;

    constructor(props: ForecastProps) {
        super(props);

        let info = props.info;
        this.weatherList = [];

        let temperatureData = [];
        let humidityData = [];
        let pressureData = [];
        let windSpeedData = [];
        let xAxis = [];

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

            this.weatherList.push(
                <div key={a} className="weatherItem">
                    <div className="date">{item.dt_txt}</div>
                    <WeatherCondition
                        temperature={item.main.temp}
                        weather={item.weather}
                    />
                    <div>
                        <span>Humidity: </span>
                        <span className="value">{item.main.humidity}</span> %
                    </div>
                    <div>
                        <span>Pressure: </span>
                        <span className="value">{item.main.pressure}</span> hPa
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

        this.chartData = {
            xAxis: xAxis,
            info: {
                temperature: {
                    state: {
                        data: temperatureData,
                        unit: "°C",
                        title: "Temperature",
                    },
                    changeChartType: () => {
                        this.showInCanvas(ForecastCanvasType.temperature);
                    },
                },
                humidity: {
                    state: {
                        data: humidityData,
                        unit: "%",
                        title: "Humidity",
                    },
                    changeChartType: () => {
                        this.showInCanvas(ForecastCanvasType.humidity);
                    },
                },
                pressure: {
                    state: {
                        data: pressureData,
                        unit: "hPa",
                        title: "Pressure",
                    },
                    changeChartType: () => {
                        this.showInCanvas(ForecastCanvasType.pressure);
                    },
                },
                windSpeed: {
                    state: {
                        data: windSpeedData,
                        unit: "m/s",
                        title: "Wind speed",
                    },
                    changeChartType: () => {
                        this.showInCanvas(ForecastCanvasType.windSpeed);
                    },
                },
            },
        };
        this.canvasType = ForecastCanvasType.temperature;
        this.state = {
            canvas: this.getCanvasInfo(this.canvasType),
        };
    }

    showInCanvas(type: ForecastCanvasType) {
        if (type === this.canvasType) {
            return;
        }

        this.canvasType = type;
        this.setState({
            canvas: this.getCanvasInfo(type),
        });
    }

    getCanvasInfo(type: ForecastCanvasType) {
        let typeStr = ForecastCanvasType[type];
        return this.chartData.info[typeStr].state;
    }

    render() {
        let cssClasses = {
            temperature: "button",
            humidity: "button",
            pressure: "button",
            windSpeed: "button",
        };

        switch (this.canvasType) {
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

        let showTemperature = this.chartData.info.temperature.changeChartType;
        let showHumidity = this.chartData.info.humidity.changeChartType;
        let showPressure = this.chartData.info.pressure.changeChartType;
        let showWindSpeed = this.chartData.info.windSpeed.changeChartType;

        return (
            <div>
                <h1>Forecast</h1>
                <ul className="horizontalList">
                    <li
                        onClick={showTemperature}
                        className={cssClasses.temperature}
                    >
                        Temperature
                    </li>
                    <li onClick={showHumidity} className={cssClasses.humidity}>
                        Humidity
                    </li>
                    <li onClick={showPressure} className={cssClasses.pressure}>
                        Pressure
                    </li>
                    <li
                        onClick={showWindSpeed}
                        className={cssClasses.windSpeed}
                    >
                        Wind speed
                    </li>
                </ul>
                <Chart
                    data={this.state.canvas.data}
                    unit={this.state.canvas.unit}
                    title={this.state.canvas.title}
                    xAxis={this.chartData.xAxis}
                />
                <div id="WeatherList">{this.weatherList}</div>
            </div>
        );
    }

    static async getCurrentWeather(
        cityName: string
    ): Promise<ForecastInfo | undefined> {
        var response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric`
        );

        if (response.status !== 200) {
            return undefined;
        }

        return await response.json();
    }
}
