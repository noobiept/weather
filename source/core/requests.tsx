import { Endpoints } from "./config";
import { CurrentWeatherInfo, ForecastInfo } from "./weather-info";

export async function getCurrentWeather(
    cityName: string
): Promise<CurrentWeatherInfo | undefined> {
    const response = await fetch(Endpoints.currentWeather(cityName));

    if (response.status !== 200) {
        return undefined;
    }

    return await response.json();
}

export async function getCurrentForecast(
    cityName: string
): Promise<ForecastInfo | undefined> {
    const response = await fetch(Endpoints.forecast(cityName));

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
