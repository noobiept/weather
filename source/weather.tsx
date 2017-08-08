import * as React from "react";
import CityInput from "./city_input";


    // reference: http://openweathermap.org/current
interface WeatherInfo {
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

interface WeatherProps {

}

interface WeatherState {
    info?: WeatherInfo;
    messageText: string;
}


class Weather extends React.Component <WeatherProps, WeatherState> {

    constructor() {
        super();

        this.keyPress = this.keyPress.bind( this );
        this.state = {
            info: undefined,
            messageText: ''
        };
    }


    keyPress( event: React.KeyboardEvent <HTMLInputElement> ) {

        switch( event.which ) {
            case 13:    // enter
                let input = event.target as HTMLInputElement;
                this.getCurrentWeather( input.value );
                break;
        }
    }


    async getCurrentWeather( cityName: string ) {

        var response = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${ cityName }&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric` );

        if ( response.status !== 200 ) {
            this.setState({
                info: undefined,
                messageText: "Couldn't find a city with that name."
            });
            return;
        }

        var data = await response.json();

        this.setState({ info: data, messageText: '' });
    }


    render() {
        let current = null;
        let info = this.state.info;

        if ( info ) {

            let weatherInfo = [];

            for (var a = 0 ; a < info.weather.length ; a++) {
                let weather = info.weather[ a ];

                weatherInfo.push(
                    <div key= { a }>
                        Main: { weather.main } Description: { weather.description }
                    </div>
                );
            }

            current = (
                <div>
                    <div>Latitude: { info.coord.lat } / Longitude: { info.coord.lon }</div>
                    <div>Humidity: { info.main.humidity } %</div>
                    <div>Pressure: { info.main.pressure } hPa</div>
                    <div>Temperature: { info.main.temp } °C</div>
                    <div>Min Temperature: { info.main.temp_min } °C</div>
                    <div>Max Temperature: { info.main.temp_max } °C</div>
                    <div>Atmospheric pressure on the sea level: { info.main.sea_level } hPa</div>
                    <div>Atmospheric pressure on the ground level: { info.main.grnd_level } hPa</div>
                    <div>Wind Speed: { info.wind.speed } meter/sec / Degree: { info.wind.deg } °</div>
                    <div>{ weatherInfo }</div>
                </div>
            );
        }

        let name = info && info.name;

        return (
            <div>
                <div>Current Weather</div>
                <CityInput onKeyPress= { this.keyPress } name= { name } message= { this.state.messageText } />
                { current }
            </div>
        );
    }
}

export default Weather