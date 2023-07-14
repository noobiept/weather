import { toHourMinute } from "../../core/utilities";
import { Value } from "../../components/styles";
import { StyledWeatherCondition, InfoList } from "./current-weather.styles";
import { CurrentWeatherProps } from "./current-weather.types";
import { Wind } from "../../components/wind";

export function CurrentWeather({ info }: CurrentWeatherProps) {
    const lastUpdated = new Date(info.dt * 1000);
    const hourMinutes = toHourMinute(lastUpdated);
    const sunrise = toHourMinute(info.sys.sunrise * 1000);
    const sunset = toHourMinute(info.sys.sunset * 1000);

    return (
        <div>
            <h1>
                {info.name}, {info.sys.country}
            </h1>
            <StyledWeatherCondition
                id="CurrentWeatherCondition"
                temperature={info.main.temp}
                weather={info.weather}
            />
            <InfoList className="infoList">
                <div>
                    <div>
                        <span>Latitude: </span>
                        <Value className="value">{info.coord.lat}</Value>
                        <span> / Longitude: </span>
                        <Value className="value">{info.coord.lon}</Value>
                    </div>
                    <div>
                        <span>Humidity: </span>
                        <Value className="value">{info.main.humidity}</Value>
                        <span> %</span>
                    </div>
                    <div>
                        <span>Pressure: </span>
                        <Value className="value">{info.main.pressure}</Value>
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
                        <Value id="SunriseValue" className="value">
                            {sunrise}
                        </Value>{" "}
                        / Sunset:{" "}
                        <Value id="SunsetValue" className="value">
                            {sunset}
                        </Value>
                    </div>
                    <div id="LastUpdated" title={lastUpdated.toString()}>
                        <span>Last updated: </span>
                        <Value className="value">{hourMinutes}</Value>
                    </div>
                </div>
            </InfoList>
        </div>
    );
}
