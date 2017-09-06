import * as React from "react";
import * as ReactDOM from "react-dom";

import CityInput from "./city_input";
import Message from "./message";
import CurrentWeather from "./current_weather";
import Forecast from "./forecast";
import SearchList from "./search_list";


interface WeatherProps {

}

interface WeatherState {
    current: React.ReactElement <CurrentWeather> | undefined;
    forecast: React.ReactElement <Forecast> | undefined;
    messageText: React.ReactElement <HTMLSpanElement> | string;     // warn/error message to show to the user
}


class Weather extends React.Component <WeatherProps, WeatherState> {

    searchList: SearchList | null;


    constructor() {
        super();

        this.changeCity = this.changeCity.bind( this );
        this.state = {
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


    async changeCity( name: string, addToList= true ) {

        this.setState({ messageText: 'Loading...' });

        let [ current, forecast ] = await Promise.all([
            await CurrentWeather.getCurrentWeather( name ),
            await Forecast.getCurrentWeather( name )
        ]);

        if ( current && forecast ) {

            if ( addToList !== false ) {
                this.searchList!.add( current.name );
            }

            this.setState({
                current: <CurrentWeather key= { 'current.' + current.name } info= { current } />,
                forecast: <Forecast key= { 'forecast.' + forecast.city.name } info= { forecast } />,
                messageText: ''
            });
        }

        else {
            this.setState({ messageText: <span>Couldn't find a city with that name (<span className="error">{ name }</span>)</span> });
        }
    }


    render() {
        return (
            <div>
                <CityInput ref="cityInput" onEnterPress= { this.changeCity } />
                <div>
                    <Message text= { this.state.messageText } />
                </div>
                <SearchList ref= { (search) => { this.searchList = search; } } onItemClick= { this.changeCity } limit= { 5 } />
                <div id="WeatherInfoContainer">
                    { this.state.current }
                    { this.state.forecast }
                </div>
            </div>
        );
    }
}

export default Weather;