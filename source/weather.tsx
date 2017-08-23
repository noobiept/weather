import * as React from "react";
import * as ReactDOM from "react-dom";

import CityInput from "./city_input";
import Message from "./message";
import CurrentWeather from "./current_weather";
import Forecast from "./forecast";


interface WeatherProps {

}

interface WeatherState {
    cityNames: string[];        // list with all the city names that were searched for
    selectedPosition: number;   // position of the currently selected city name element
    current: React.ReactElement <CurrentWeather> | undefined;
    forecast: React.ReactElement <Forecast> | undefined;
    messageText: string;        // warn/error message to show to the user
}


class Weather extends React.Component <WeatherProps, WeatherState> {

    constructor() {
        super();

        this.changeCity = this.changeCity.bind( this );
        this.state = {
            cityNames: [],
            current: undefined,
            forecast: undefined,
            messageText: '',
            selectedPosition: -1
        };
    }


    componentDidMount() {
            // focus the city element element whenever a key is pressed
        window.addEventListener( 'keypress', () => {
            let input = ReactDOM.findDOMNode( this.refs.cityInput ) as HTMLInputElement;
            input.focus();
        });
    }


    async changeCity( name: string, previousPosition?: number ) {

        this.setState({ messageText: 'Loading...' });

        let [ current, forecast ] = await Promise.all([
            await CurrentWeather.getCurrentWeather( name ),
            await Forecast.getCurrentWeather( name )
        ]);

        if ( current && forecast ) {

            let updated = this.state.cityNames.slice();
            let position;

                // add a new entry to the list
            if ( typeof previousPosition === 'undefined' ) {
                position = updated.length;
                updated.push( current.name );
            }

            else {
                position = previousPosition;
            }



            this.setState({
                current: <CurrentWeather key= { 'current.' + current.name } info= { current } />,
                forecast: <Forecast key= { 'forecast.' + forecast.city.name } info= { forecast } />,
                messageText: '',
                cityNames: updated,
                selectedPosition: position
            });
        }

        else {
            this.setState({ messageText: `Couldn't find a city with that name (${ name })` });
        }
    }


    render() {
        let citySearches = [];

        for (let a = 0 ; a < this.state.cityNames.length ; a++) {
            let name = this.state.cityNames[ a ];
            let position = a;
            let clickHandler = () => { this.changeCity( name, position ); };
            let cssClass = 'button';

            if ( a === this.state.selectedPosition ) {
                cssClass += ' selected';
            }

            citySearches.push(
                <a key= { a } className= { cssClass } onClick= { clickHandler }>{ name }</a>
            );
        }

        return (
            <div>
                <CityInput ref="cityInput" onEnterPress= { this.changeCity } />
                <div>
                    <Message text= { this.state.messageText } />
                </div>
                <div>Previous searches: { citySearches.length ? citySearches : '---' }</div>
                <div id="WeatherInfoContainer">
                    { this.state.current }
                    { this.state.forecast }
                </div>
            </div>
        );
    }
}

export default Weather;