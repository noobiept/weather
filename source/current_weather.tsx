import * as React from "react";
import Message from "./message";


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
    cityName: string;
}

interface CurrentWeatherState {
    info?: CurrentWeatherInfo;     // the loaded weather information
    messageText: string;    // warn/error message to show to the user
    loading: boolean;       // if the weather information is being loaded
}


class CurrentWeather extends React.Component <CurrentWeatherProps, CurrentWeatherState> {

    constructor() {
        super();

        this.state = {
            info: undefined,
            messageText: '',
            loading: false
        };
    }


    componentDidMount() {
        this.getCurrentWeather( this.props.cityName );
    }


    async getCurrentWeather( cityName: string ) {

        this.setState({ loading: true });
        var response = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${ cityName }&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric` );

        if ( response.status !== 200 ) {
            this.setState({
                info: undefined,
                messageText: "Couldn't find a city with that name.",
                loading: false
            });
            return;
        }

        var data = await response.json();

        this.setState({
            info: data,
            messageText: '',
            loading: false
        });
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

            let seaLevel;
            if ( info.main.sea_level ) {
                seaLevel = <div>Atmospheric pressure on the sea level: { info.main.sea_level } hPa</div>;
            }

            let groundLevel;
            if ( info.main.grnd_level ) {
                groundLevel = <div>Atmospheric pressure on the ground level: { info.main.grnd_level } hPa</div>;
            }


            current = (
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

        return (
            <div>
                <Message text= { this.state.messageText } />
                { this.state.loading ? 'loading..' : current }
            </div>
        );
    }
}

export default CurrentWeather;