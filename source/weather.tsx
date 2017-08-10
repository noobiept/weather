import * as React from "react";
import CityInput from "./city_input";
import CurrentWeather from "./current_weather";



interface WeatherProps {

}

interface WeatherState {
    cityName: string;
}


class Weather extends React.Component <WeatherProps, WeatherState> {

    constructor() {
        super();

        this.changeCity = this.changeCity.bind( this );
        this.state = {
            cityName: ''
        };
    }


    changeCity( name: string ) {

    this.setState({ cityName: name });
    }


    render() {

        return (
            <div>
                <div>Current Weather</div>
                <CityInput onEnterPress= { this.changeCity } />
                <CurrentWeather cityName= { this.state.cityName } />
            </div>
        );
    }
}

export default Weather