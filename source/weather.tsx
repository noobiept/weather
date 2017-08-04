import * as React from "react";

interface WeatherInfo {
    name: string;
    weather: {
        description: string;
    }[];
    coord: {
        lat: number;
        lon: number;
    };
    main: {
        humidity: number;
        pressure: number;
        temp: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
        deg: number;
    }
}

interface WeatherProps {

}

interface WeatherState {
    info?: WeatherInfo;
}


class Weather extends React.Component <WeatherProps, WeatherState> {

    constructor() {
        super();

        this.keyPress = this.keyPress.bind( this );
        this.state = { info: undefined };
    }

    keyPress( event: React.KeyboardEvent <HTMLInputElement> ) {

        switch( event.which ) {
            case 13:    // enter
                let input = event.target as HTMLInputElement;
                this.getWeather( input.value );
                break;
        }
    }

    async getWeather( name: string ) {

        var response = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${ name }&appid=8cffe81fbe82ac71521e0cf28f0f3496` );

        if ( response.status !== 200 ) {
            console.warn( 'Name:', name );
            return;
        }

        var data = await response.json();

        this.setState({ info: data });
        console.log( data );
    }

    render() {
        let current = null;
        let info = this.state.info;

        if ( info ) {

            let weatherInfo = [];

            for (var a = 0 ; a < info.weather.length ; a++) {
                let weather = info.weather[ a ];

                weatherInfo.push(
                    <div key= { a }>Description: { weather.description }</div>
                );
            }

            current = (
                <div>
                    <div>Latitude: { info.coord.lat } / Longitude: { info.coord.lon }</div>
                    <div>Humidity: { info.main.humidity }</div>
                    <div>Pressure: { info.main.pressure }</div>
                    <div>Temperature: { info.main.temp }</div>
                    <div>Min Temperature: { info.main.temp_min }</div>
                    <div>Max Temperature: { info.main.temp_max }</div>
                    <div>Wind Speed: { info.wind.speed } / Degree: { info.wind.deg }</div>
                    <div>{ weatherInfo }</div>
                </div>
            );
        }

        return (
            <div>
                <div>Current Weather</div>
                <div>Location: { info ? info.name : '---' }</div>
                <input type="text" onKeyPress= { this.keyPress }></input>
                { current }
            </div>
        );
    }
}

export default Weather