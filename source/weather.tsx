import * as React from "react";
import * as ReactDOM from "react-dom";

import CityInput from "./city_input";
import Message from "./message";
import CurrentWeather from "./current_weather";
import Forecast from "./forecast";


interface WeatherProps {

}

interface WeatherState {
    cityNames: React.ReactElement <HTMLAnchorElement>[];    // list with all the city names that were searched for
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


    async changeCity( name: string, addToCityList= true ) {

        this.setState({ messageText: 'Loading...' });

        let [ current, forecast ] = await Promise.all([
            await CurrentWeather.getCurrentWeather( name ),
            await Forecast.getCurrentWeather( name )
        ]);

        if ( current && forecast ) {

            let updated = this.state.cityNames.slice();

            if ( addToCityList ) {
                let properName = current.name;
                let clickHandler = () => { this.changeCity( properName, false ); };

                updated.push( <a key= { this.state.cityNames.length } className="cityLink" onClick= { clickHandler }>{ properName }</a> );
            }

            this.setState({
                current: <CurrentWeather info= { current } />,
                forecast: <Forecast info= { forecast } />,
                messageText: '',
                cityNames: updated
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
                <CityInput ref="cityInput" onEnterPress= { this.changeCity } />
                <div>
                    <Message text= { this.state.messageText } />
                </div>
                <div>Previous searches: { this.state.cityNames.length ? this.state.cityNames : '---' }</div>
                <div id="WeatherInfoContainer">
                    { this.state.current }
                    { this.state.forecast }
                </div>
            </div>
        );
    }
}

export default Weather;