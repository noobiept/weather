import { CurrentWeatherInfo, ForecastInfo } from "./weather_info";

export async function getCurrentWeather(
    cityName: string
): Promise<CurrentWeatherInfo | undefined> {
    var response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric`
    );

    if (response.status !== 200) {
        return undefined;
    }

    return await response.json();
}

export async function getCurrentForecast(
    cityName: string
): Promise<ForecastInfo | undefined> {
    var response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric`
    );

    if (response.status !== 200) {
        return undefined;
    }

    return await response.json();
}
