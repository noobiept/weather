import React from "react";

import { CurrentWeatherInfo } from "../shared/weather_info";
import WeatherCondition from "./weather_condition";
import Wind from "./wind";
import { toHourMinute } from "../shared/utilities";

interface CurrentWeatherProps {
    info: CurrentWeatherInfo;
}

export default function CurrentWeather({ info }: CurrentWeatherProps) {
    const lastUpdated = new Date(info.dt * 1000);
    const hourMinutes = toHourMinute(lastUpdated);
    const sunrise = toHourMinute(info.sys.sunrise * 1000);
    const sunset = toHourMinute(info.sys.sunset * 1000);

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
            <div className="infoList">
                <div>
                    <div>
                        <span>Latitude: </span>
                        <span className="value">{info.coord.lat}</span>
                        <span> / Longitude: </span>
                        <span className="value">{info.coord.lon}</span>
                    </div>
                    <div>
                        <span>Humidity: </span>
                        <span className="value">{info.main.humidity}</span>
                        <span> %</span>
                    </div>
                    <div>
                        <span>Pressure: </span>
                        <span className="value">{info.main.pressure}</span>
                        <span> hPa</span>
                    </div>
                </div>
                <div>
                    <Wind
                        speed={info.wind.speed}
                        degree={info.wind.deg ?? 0}
                        canvasWidth={15}
                        canvasHeight={15}
                    />
                    <div>
                        Sunrise:{" "}
                        <span id="SunriseValue" className="value">
                            {sunrise}
                        </span>{" "}
                        / Sunset:{" "}
                        <span id="SunsetValue" className="value">
                            {sunset}
                        </span>
                    </div>
                    <div id="LastUpdated" title={lastUpdated.toString()}>
                        <span>Last updated: </span>
                        <span className="value">{hourMinutes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
