import { CurrentWeatherInfo, ForecastInfo } from "./weather-info";

export async function getCurrentWeather(
    cityName: string
): Promise<CurrentWeatherInfo | undefined> {
    const response = await fetch(
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
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8cffe81fbe82ac71521e0cf28f0f3496&units=metric`
    );

    if (response.status !== 200) {
        return undefined;
    }

    return await response.json();
}

/**
 * Get all the weather data of the given city.
 */
export async function getWeatherData(cityName: string) {
    try {
        const [currentData, forecastData] = await Promise.all([
            await getCurrentWeather(cityName),
            await getCurrentForecast(cityName),
        ]);

        return {
            currentData,
            forecastData,
        };
    } catch {
        return;
    }
}
