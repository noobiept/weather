import * as React from "react";
import { WeatherConditionInfo } from "./weather";


interface WeatherConditionProps {
    weather: WeatherConditionInfo[];
    temperature: number;
}

interface WeatherConditionState {

}


/**
 * Shows the given temperature plus the associated weather condition (represented by an image).
 */
class WeatherCondition extends React.Component <WeatherConditionProps, WeatherConditionState> {

    render() {
        let weather = this.props.weather;
        let weatherInfo = [];

        for (var a = 0 ; a < weather.length ; a++) {
            let info = weather[ a ];

            weatherInfo.push(
                <img className="weatherCondition" key= { a } title= { info.description } src={ `http://openweathermap.org/img/w/${ info.icon }.png` } />
            );
        }

        return (
            <div>{ weatherInfo } Temperature: { this.props.temperature } °C</div>
        );
    }
}

export default WeatherCondition;