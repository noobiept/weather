import * as React from "react";
import { WeatherConditionInfo } from "./weather";
import WeatherCondition from "./weather_condition";
import Wind from "./wind";

    // reference: http://openweathermap.org/current
interface CurrentWeatherInfo {
    name: string;               // City name
    weather: WeatherConditionInfo[];
    coord: {
        lat: number;            // City geo location, latitude
        lon: number;            // City geo location, longitude
    };
    main: {
        humidity: number;       // Humidity, %
        pressure: number;       // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
        temp: number;           // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        temp_min: number;       // Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        temp_max: number;       // Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        sea_level: number;      // Atmospheric pressure on the sea level, hPa
        grnd_level: number;     // Atmospheric pressure on the ground level, hPa
    };
    wind: {
        speed: number;          // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
        deg: number;            // Wind direction, degrees (meteorological)
    };
    dt: number;                 // Time of data calculation, unix, UTC
    sys: {
        country: string;        // Country code (GB, JP etc.)
        sunrise: number;        // Sunrise time, unix, UTC
        sunset: number;         // Sunset time, unix, UTC
    };
}

interface CurrentWeatherProps {
    info: CurrentWeatherInfo;
}

interface CurrentWeatherState {

}


class CurrentWeather extends React.Component <CurrentWeatherProps, CurrentWeatherState> {

    static async getCurrentWeather( cityName: string ): Promise <CurrentWeatherInfo | undefined> {

        var response = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${ cityName }&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric` );

        if ( response.status !== 200 ) {
            return undefined;
        }

        return await response.json();
    }


    render() {
        let current = null;
        let info = this.props.info;

        let seaLevel;
        if ( info.main.sea_level ) {
            seaLevel = <div>Atmospheric pressure on the sea level: { info.main.sea_level } hPa</div>;
        }

        let groundLevel;
        if ( info.main.grnd_level ) {
            groundLevel = <div>Atmospheric pressure on the ground level: { info.main.grnd_level } hPa</div>;
        }

        let lastUpdated = new Date( info.dt * 1000 );
        let hourMinutes = `${ lastUpdated.getHours() }h ${ lastUpdated.getMinutes() }m`;

        return (
            <div>
                <h1>{ info.name }, { info.sys.country }</h1>
                <WeatherCondition temperature= { info.main.temp } weather= { info.weather } />
                <div title={ lastUpdated.toString() }>Last updated: { hourMinutes }</div>
                <div>Latitude: { info.coord.lat } / Longitude: { info.coord.lon }</div>
                <div>Humidity: { info.main.humidity } %</div>
                <div>Pressure: { info.main.pressure } hPa</div>
                { seaLevel }
                { groundLevel }
                <Wind speed= { info.wind.speed } degree= { info.wind.deg } canvasWidth= { 15 } canvasHeight= { 15 } />
            </div>
        );
    }
}

export default CurrentWeather;