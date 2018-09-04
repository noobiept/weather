import * as React from "react";
import { WeatherConditionInfo } from "./weather_info";


interface WeatherConditionProps {
    id?: string;
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
                <img className="weatherCondition" key= { a } title= { info.description } src={ `https://openweathermap.org/img/w/${ info.icon }.png` } />
            );
        }

        return (
            <div id= { this.props.id }>{ weatherInfo } Temperature: <span className="value">{ this.props.temperature }</span> °C</div>
        );
    }
}

export default WeatherCondition;