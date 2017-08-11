import * as React from "react";
import CityInput from "./city_input";
import CurrentWeather from "./current_weather";



interface WeatherProps {

}

interface WeatherState {
    all: React.ReactElement <CurrentWeather>[];
}


class Weather extends React.Component <WeatherProps, WeatherState> {


    constructor() {
        super();

        this.changeCity = this.changeCity.bind( this );
        this.state = {
            all: []
        };
    }


    changeCity( name: string ) {

        let updated = this.state.all.slice();
        updated.push( <CurrentWeather key= { updated.length } cityName= { name } /> );

        this.setState({ all: updated });
    }


    render() {
        return (
            <div>
                <div>Current Weather</div>
                <CityInput onEnterPress= { this.changeCity } />
                <div id="WeatherInfoContainer">
                    { this.state.all }
                </div>
            </div>
        );
    }
}

export default Weather;