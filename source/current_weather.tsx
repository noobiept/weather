import * as React from "react";
import { CurrentWeatherInfo } from "./weather_info";
import WeatherCondition from "./weather_condition";
import Wind from "./wind";
import { toHourMinute } from "./utilities";

interface CurrentWeatherProps {
    info: CurrentWeatherInfo;
}

interface CurrentWeatherState {}

export default class CurrentWeather extends React.Component<
    CurrentWeatherProps,
    CurrentWeatherState
> {
    static async getCurrentWeather(
        cityName: string
    ): Promise<CurrentWeatherInfo | undefined> {
        var response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric`
        );

        if (response.status !== 200) {
            return undefined;
        }

        return await response.json();
    }

    render() {
        let info = this.props.info;
        let lastUpdated = new Date(info.dt * 1000);
        let hourMinutes = toHourMinute(lastUpdated);
        let sunrise = toHourMinute(info.sys.sunrise * 1000);
        let sunset = toHourMinute(info.sys.sunset * 1000);

        return (
            <div>
                <h1>
                    {info.name}, {info.sys.country}
                </h1>
                <WeatherCondition
                    id="CurrentWeatherCondition"
                    temperature={info.main.temp}
                    weather={info.weather}
                />
                <div className="twoColumns">
                    <div>
                        <span>Latitude: </span>
                        <span className="value">{info.coord.lat}</span>
                        <span> / Longitude: </span>
                        <span className="value">{info.coord.lon}</span>
                    </div>
                    <div>
                        <span>Humidity: </span>
                        <span className="value"> {info.main.humidity}</span> %
                    </div>
                    <div>
                        <span>Pressure: </span>
                        <span className="value">{info.main.pressure}</span> hPa
                    </div>
                    <Wind
                        speed={info.wind.speed}
                        degree={info.wind.deg}
                        canvasWidth={15}
                        canvasHeight={15}
                    />
                    <div>
                        Sunrise: <span className="value">{sunrise}</span> /
                        Sunset: <span className="value">{sunset}</span>
                    </div>
                    <div title={lastUpdated.toString()}>
                        <span>Last updated: </span>
                        <span className="value">{hourMinutes}</span>
                    </div>
                </div>
            </div>
        );
    }
}
