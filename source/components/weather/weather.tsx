import { useRef, useEffect, useState, useCallback } from "react";

import Message from "../message/message";
import CurrentWeather from "../current_weather/current_weather";
import Forecast from "../forecast/forecast";
import Help from "../help/help";
import { getWeatherData } from "../../shared/requests";
import {
    WeatherInfoContainer,
    InitialLoading,
    globalStyle,
} from "./weather.styles";
import { gainFocus } from "../../shared/utilities";
import { Global } from "@emotion/react";
import { Search } from "../../features/search/search";
import { useSearchList } from "../../features/search-list/search-list.hooks";
import { SearchList } from "../../features/search-list";

export default function Weather() {
    const cityInputRef = useRef<HTMLInputElement>(null);

    const [current, setCurrent] = useState<JSX.Element>();
    const [forecast, setForecast] = useState<JSX.Element>();
    const [messageText, setMessageText] = useState(""); // warn/error message to show to the user
    const [querying, setQuerying] = useState(false);
    const { cities, loading, position, updateCityPosition, addCityName } =
        useSearchList();

    useEffect(() => {
        if (!loading && cities.length !== 0 && position >= 0) {
            const name = cities[position];
            changeCity(name, position, false);
        }
    }, [cities, loading]);

    useEffect(() => {
        const keyPressListener = () => {
            gainFocus(cityInputRef.current);
        };

        // focus the city element element whenever a key is pressed
        window.addEventListener("keypress", keyPressListener);

        return () => {
            window.removeEventListener("keypress", keyPressListener);
        };
    }, []);

    /**
     * Load a different city weather information.
     * If `existingPosition` is not given, then its a new city that we need to add to the cities list.
     * We can optionally not save the changes to the state/storage (useful when loading at the beginning for example).
     * Returns a boolean that tells whether the operation was successful or not.
     */
    const changeCity = useCallback(
        async (name: string, existingPosition?: number, save = true) => {
            if (name.length <= 3) {
                setMessageText(
                    "The query needs to have more than 3 characters."
                );
                return false;
            }

            setQuerying(true);
            setMessageText("");

            const data = await getWeatherData(name);
            if (!data) {
                setMessageText("Failed to connect to the weather API.");
                return false;
            }
            setQuerying(false);

            const { currentData, forecastData } = data;

            if (currentData && forecastData) {
                if (save) {
                    // a new city that we need to add
                    if (typeof existingPosition === "undefined") {
                        existingPosition = addCityName(
                            `${currentData.name}, ${currentData.sys.country}`
                        );
                    }

                    updateCityPosition(existingPosition);
                }

                setCurrent(
                    <CurrentWeather
                        key={"current." + currentData.name}
                        info={currentData}
                    />
                );
                setForecast(
                    <Forecast
                        key={"forecast." + forecastData.city.name}
                        info={forecastData}
                    />
                );
            } else {
                setMessageText(`Couldn't find a city with the name "${name}"`);
                return false;
            }

            return true;
        },
        [cities]
    );

    return (
        <div id="Weather">
            <Global styles={globalStyle} />
            {loading ? (
                <InitialLoading active />
            ) : (
                <>
                    <Search
                        onInput={changeCity}
                        cityInputRef={cityInputRef}
                        querying={querying}
                    />
                    <Message text={messageText} />
                    <SearchList
                        cityNames={cities}
                        selectedPosition={position}
                        onItemClick={changeCity}
                    />

                    {cities.length !== 0 ? (
                        <WeatherInfoContainer id="WeatherInfoContainer">
                            {current}
                            {forecast}
                        </WeatherInfoContainer>
                    ) : (
                        <Help />
                    )}
                </>
            )}
        </div>
    );
}
