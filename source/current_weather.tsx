import * as React from "react";


    // reference: http://openweathermap.org/current
interface CurrentWeatherInfo {
    name: string;               // City name
    weather: {
        main: string;           // Group of weather parameters (Rain, Snow, Extreme etc.)
        description: string;    // Weather condition within the group
    }[];
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

        let weatherInfo = [];

        for (var a = 0 ; a < info.weather.length ; a++) {
            let weather = info.weather[ a ];

            weatherInfo.push(
                <div key= { a }>
                    Main: { weather.main } Description: { weather.description }
                </div>
            );
        }

        let seaLevel;
        if ( info.main.sea_level ) {
            seaLevel = <div>Atmospheric pressure on the sea level: { info.main.sea_level } hPa</div>;
        }

        let groundLevel;
        if ( info.main.grnd_level ) {
            groundLevel = <div>Atmospheric pressure on the ground level: { info.main.grnd_level } hPa</div>;
        }


        return (
            <div>
                <div>Location: { info.name }</div>
                <div>Latitude: { info.coord.lat } / Longitude: { info.coord.lon }</div>
                <div>Humidity: { info.main.humidity } %</div>
                <div>Pressure: { info.main.pressure } hPa</div>
                <div>Temperature: { info.main.temp } °C</div>
                <div>Min Temperature: { info.main.temp_min } °C</div>
                <div>Max Temperature: { info.main.temp_max } °C</div>
                { seaLevel }
                { groundLevel }
                <div>Wind Speed: { info.wind.speed } meter/sec / Degree: { info.wind.deg } °</div>
                <div>{ weatherInfo }</div>
            </div>
        );
    }
}

export default CurrentWeather;