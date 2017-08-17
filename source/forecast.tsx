import * as React from "react";

import Chart from "./chart";


    // reference: http://openweathermap.org/forecast5
interface ForecastInfo {
    list: {
        dt: number;
        dt_txt: string;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf: number;
        };
        weather: {
            main: string;
            description: string;
        }[];
        wind: {
            speed: number;
            deg: number;
        };
    }[];
    city: {
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
    };
}

interface ForecastProps {
    info: ForecastInfo;
}

interface ForecastState {

}


class Forecast extends React.Component <ForecastProps, ForecastState> {

    static async getCurrentWeather( cityName: string ): Promise <ForecastInfo | undefined> {

        var response = await fetch( `http://api.openweathermap.org/data/2.5/forecast?q=${ cityName }&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric` )

        if ( response.status !== 200 ) {
            return undefined;
        }

        return await response.json();
    }


    render() {
        let info = this.props.info;
        let weatherList = [];
        let temperatures = [];
        let humidities = [];

        for (let a = 0 ; a < info.list.length ; a++) {
            let item = info.list[ a ];
            let weatherDescription = [];

            for (let b = 0 ; b < item.weather.length ; b++) {
                let weather = item.weather[ b ];

                weatherDescription.push(
                    <div key= { b }>Main: { weather.main } / Description: { weather.description }</div>
                )
            }

            temperatures.push( item.main.temp );
            humidities.push( item.main.humidity );

            weatherList.push(
                <div key={ a }>
                    <div>dt: { item.dt_txt } ({ item.dt })</div>
                    <div>{ item.main.pressure }</div>
                    <div>{ item.main.sea_level }</div>
                    <div>{ item.main.grnd_level }</div>
                    <div>{ item.main.temp_kf }</div>
                    <div>{ weatherDescription }</div>
                    <div>Wind speed: { item.wind.speed } / Degrees: { item.wind.deg }</div>
                </div>
            )
        }

        return (
            <div>
                <div>City: { info.city.name }</div>
                <div>Lat: { info.city.coord.lat } / Lon: { info.city.coord.lon }</div>
                <Chart width= { 800 } height= { 400 } data= { temperatures } unit= { '°C' } title= { 'Temperature' } />
                <Chart width= { 800 } height= { 400 } data= { humidities } unit= { '%' } title= { 'Humidity' } />
                <div>{ weatherList }</div>
            </div>
        );
    }
}

export default Forecast;