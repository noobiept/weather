/**
 * Has the interfaces that represent the data that comes from the weather API.
 */

    // reference: http://openweathermap.org/current
export interface CurrentWeatherInfo {
    name: string;               // City name
    weather: WeatherConditionInfo[];
    coord: Coordinates;
    main: MainWeatherInfo;
    wind: WindInfo;
    dt: number;                 // Time of data calculation, unix, UTC
    sys: {
        country: string;        // Country code (GB, JP etc.)
        sunrise: number;        // Sunrise time, unix, UTC
        sunset: number;         // Sunset time, unix, UTC
    };
}

    // reference: http://openweathermap.org/forecast5
export interface ForecastInfo {
    list: {
        dt: number;
        dt_txt: string;
        main: MainWeatherInfo;
        weather: WeatherConditionInfo[];
        wind: WindInfo;
    }[];
    city: {
        name: string;
        coord: Coordinates;
        country: string;
    };
}

export interface WeatherConditionInfo {
    id: number;
    icon: string;           // 'id' of the weather icon
    main: string;           // Group of weather parameters (Rain, Snow, Extreme etc.)
    description: string;    // Weather condition within the group
}

export interface Coordinates {
    lat: number;    // City geo location, latitude
    lon: number;    // City geo location, longitude
}

export interface MainWeatherInfo {
    humidity: number;       // Humidity, %
    pressure: number;       // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    temp: number;           // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_min: number;       // Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_max: number;       // Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    sea_level: number;      // Atmospheric pressure on the sea level, hPa
    grnd_level: number;     // Atmospheric pressure on the ground level, hPa
}

export interface WindInfo {
    speed: number;          // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    deg: number;            // Wind direction, degrees (meteorological)
}