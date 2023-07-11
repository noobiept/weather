import { useCallback, useState } from "react";
import { getWeatherData } from "../../shared/requests";
import { CurrentWeatherInfo, ForecastInfo } from "../../shared/weather_info"; //TODO should be located in the feature folder

export function useSearch(
    onSearch: (cityName: string, existingPosition?: number) => void
) {
    const [querying, setQuerying] = useState(false);
    const [current, setCurrent] = useState<CurrentWeatherInfo>();
    const [forecast, setForecast] = useState<ForecastInfo>();
    const [error, setError] = useState(""); // warn/error message to show to the user

    /**
     * Load a different city weather information.
     * If `existingPosition` is not given, then its a new city that we need to add to the cities list.
     * We can optionally not save the changes to the state/storage (useful when loading at the beginning for example).
     * Returns a boolean that tells whether the operation was successful or not.
     */
    const search = useCallback(
        async (name: string, existingPosition?: number, save = true) => {
            if (name.length <= 3) {
                setError("The query needs to have more than 3 characters.");
                return false;
            }

            setQuerying(true);
            setError("");

            const data = await getWeatherData(name); //TODO should be located in the feature folder
            if (!data) {
                setError("Failed to connect to the weather API.");
                return false;
            }
            setQuerying(false);

            const { currentData, forecastData } = data;

            if (currentData && forecastData) {
                setCurrent(currentData);
                setForecast(forecastData);

                if (save) {
                    onSearch(
                        `${currentData.name}, ${currentData.sys.country}`,
                        existingPosition
                    );
                }
            } else {
                setError(`Couldn't find a city with the name "${name}"`);
                return false;
            }

            return true;
        },
        []
    );

    return {
        search,
        querying,
        error,
        current,
        forecast,
    };
}
