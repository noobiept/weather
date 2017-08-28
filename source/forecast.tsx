import * as React from "react";

import Chart from "./chart";
import { WeatherConditionInfo } from "./weather";
import WeatherCondition from "./weather_condition";


    // reference: http://openweathermap.org/forecast5
interface ForecastInfo {
    list: {
        dt: number;
        dt_txt: string;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: WeatherConditionInfo[];
        wind: {
            speed: number;
            deg: number;
        };
    }[];
    city: {
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
    };
}

interface ForecastProps {
    info: ForecastInfo;
}

interface ForecastState {
    canvas: {
        width: number;
        height: number;
        data: number[];
        unit: string;
        title: string;
    };
}

enum ForecastCanvasType {
    temperature, humidity
}


class Forecast extends React.Component <ForecastProps, ForecastState> {

    temperatures: number[];
    humidities: number[];
    xAxis: string[];
    weatherList: React.ReactElement <HTMLDivElement>[];
    showTemperature: () => void;
    showHumidity: () => void;
    canvasType: ForecastCanvasType;


    constructor( props: ForecastProps ) {
        super( props );

        let info = props.info;
        this.weatherList = [];
        this.temperatures = [];
        this.humidities = [];
        this.xAxis = [];

        for (let a = 0 ; a < info.list.length ; a++) {
            let item = info.list[ a ];

                // get the hour/minute from each item, to be displayed on the chart later on
            let date = new Date( item.dt );
            let hourMinute = `${ date.getHours() }:${ date.getMinutes() }`;

            this.temperatures.push( item.main.temp );
            this.humidities.push( item.main.humidity );
            this.xAxis.push( hourMinute );

            this.weatherList.push(
                <div key={ a }>
                    <div className="date">{ item.dt_txt }</div>
                    <WeatherCondition temperature= { item.main.temp } weather= { item.weather } />
                    <div>Humidity: { item.main.humidity } %</div>
                    <div>Pressure: { item.main.pressure } hPa</div>
                    <div>Wind speed: { item.wind.speed } meter/sec / Degrees: { item.wind.deg }</div>
                </div>
            )
        }

        this.showTemperature = () => {
            this.showInCanvas( ForecastCanvasType.temperature );
        };
        this.showHumidity = () => {
            this.showInCanvas( ForecastCanvasType.humidity );
        };

        this.canvasType = ForecastCanvasType.temperature;
        this.state = {
            canvas: {
                width: 800,
                height: 400,
                ...this.getCanvasInfo( this.canvasType )
            }
        };
    }


    getCanvasInfo( type: ForecastCanvasType ) {
        if ( type === ForecastCanvasType.temperature ) {
            return {
                data: this.temperatures,
                unit: '°C',
                title: 'Temperature'
            };
        }

        else {
            return {
                data: this.humidities,
                unit: '%',
                title: 'Humidity'
            };
        }
    }


    showInCanvas( type: ForecastCanvasType ) {

        if ( type === this.canvasType ) {
            return;
        }

        this.canvasType = type;
        this.setState({
            canvas: {
                width: this.state.canvas.width,
                height: this.state.canvas.height,
                ...this.getCanvasInfo( type )
            }
        });
    }


    render() {

        let temperatureClass = 'button';
        let humidityClass = 'button';

        if ( this.canvasType === ForecastCanvasType.temperature ) {
            temperatureClass += ' selected';
        }

        else {
            humidityClass += ' selected';
        }

        return (
            <div>
                <h1>Forecast</h1>
                <ul id="ChartTypeList">
                    <li onClick= { this.showTemperature } className= { temperatureClass }>Temperature</li>
                    <li onClick= { this.showHumidity } className= { humidityClass }>Humidity</li>
                </ul>
                <Chart width= { this.state.canvas.width } height= { this.state.canvas.height } data= { this.state.canvas.data } unit= { this.state.canvas.unit } title= { this.state.canvas.title } xAxis= { this.xAxis } />
                <div id="WeatherList">{ this.weatherList }</div>
            </div>
        );
    }


    static async getCurrentWeather( cityName: string ): Promise <ForecastInfo | undefined> {

        var response = await fetch( `http://api.openweathermap.org/data/2.5/forecast?q=${ cityName }&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric` )

        if ( response.status !== 200 ) {
            return undefined;
        }

        return await response.json();
    }
}

export default Forecast;