import * as React from "react";
import * as ReactDOM from "react-dom";

import CityInput from "./city_input";
import Message from "./message";
import CurrentWeather from "./current_weather";


interface WeatherProps {

}

interface WeatherState {
    all: React.ReactElement <CurrentWeather>[];
    messageText: string;    // warn/error message to show to the user
}


class Weather extends React.Component <WeatherProps, WeatherState> {

    constructor() {
        super();

        this.changeCity = this.changeCity.bind( this );
        this.state = {
            all: [],
            messageText: ''
        };
    }


    componentDidMount() {
            // focus the city element element whenever a key is pressed
        window.addEventListener( 'keypress', () => {
            let input = ReactDOM.findDOMNode( this.refs.cityInput ) as HTMLInputElement;
            input.focus();
        });
    }


    async changeCity( name: string ) {

        this.setState({ messageText: 'Loading...' });
        let info = await CurrentWeather.getCurrentWeather( name );

        if ( info ) {
            let updated = this.state.all.slice();
            updated.push( <CurrentWeather key= { updated.length } info= { info } /> );

            this.setState({
                all: updated,
                messageText: ''
            });
        }

        else {
            this.setState({ messageText: `Couldn't find a city with that name (${ name })` });
        }
    }


    render() {
        return (
            <div>
                <div>Current Weather</div>
                <div>
                    <CityInput ref="cityInput" onEnterPress= { this.changeCity } />
                    <Message text= { this.state.messageText } />
                </div>
                <div id="WeatherInfoContainer">
                    { this.state.all }
                </div>
            </div>
        );
    }
}

export default Weather;