import React, { useRef, useEffect, useState, useCallback } from "react";

import CityInput from "../city_input/city_input";
import Message from "../message/message";
import CurrentWeather from "../current_weather/current_weather";
import Forecast from "../forecast/forecast";
import SearchList from "../search_list/search_list";
import Loading from "../loading/loading";
import Help from "../help/help";
import { getFromStorage, saveToStorage } from "../../shared/data";
import { getCurrentWeather, getCurrentForecast } from "../../shared/requests";
import { WeatherInfoContainer, List, GlobalStyle } from "./weather.styles";
import { gainFocus } from "../../shared/utilities";

export default function Weather() {
    const searchLimit = 5; // maximum number of elements in the search list
    const cityInputRef = useRef<HTMLInputElement>(null);

    const [cities, setCities] = useState<string[]>([]); // list with all the city names that were searched for
    const [position, setPosition] = useState(-1); // position of the currently selected city name element
    const [current, setCurrent] = useState<JSX.Element>();
    const [forecast, setForecast] = useState<JSX.Element>();
    const [messageText, setMessageText] = useState(""); // warn/error message to show to the user
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // focus the city element element whenever a key is pressed
        window.addEventListener("keypress", () => {
            gainFocus(cityInputRef.current);
        });

        const loadedCities = getFromStorage("weather_search_list") ?? [];
        const loadedPosition =
            getFromStorage("weather_selected_position") ?? -1;

        // load the last city that was selected in the previous session
        if (loadedCities.length !== 0 && loadedPosition >= 0) {
            setCities(loadedCities);
            setPosition(loadedPosition);

            const name = loadedCities[loadedPosition];
            changeCity(name, loadedPosition, false);
        }
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

            setLoading(true);
            setMessageText("");

            try {
                var [current, forecast] = await Promise.all([
                    await getCurrentWeather(name),
                    await getCurrentForecast(name),
                ]);
            } catch {
                setMessageText("Failed to connect to the weather API.");
                return false;
            } finally {
                setLoading(false);
            }

            if (current && forecast) {
                if (save) {
                    // a new city that we need to add
                    if (typeof existingPosition === "undefined") {
                        existingPosition = addCityName(
                            `${current.name}, ${current.sys.country}`
                        );
                    }

                    updateCityPosition(existingPosition);
                }

                setCurrent(
                    <CurrentWeather
                        key={"current." + current.name}
                        info={current}
                    />
                );
                setForecast(
                    <Forecast
                        key={"forecast." + forecast.city.name}
                        info={forecast}
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

    /**
     * Set a new selected city position.
     */
    function updateCityPosition(position: number) {
        setPosition(position);
        saveToStorage("weather_selected_position", position);
    }

    /**
     * Add a new city to the search list.
     * Returns the position of the new entry in the search list.
     * If the city already exists in the list, then we just return its position.
     */
    function addCityName(name: string) {
        // already in the list
        const existingIndex = cities.indexOf(name);
        if (existingIndex >= 0) {
            return existingIndex;
        }

        const updated = cities.slice();
        let position = updated.length;
        updated.push(name);

        // if we get past the limit, remove the older entry (at the start of the array)
        if (updated.length > searchLimit) {
            updated.splice(0, 1);
            position--;
        }

        setCities(updated);
        saveToStorage("weather_search_list", updated);

        return position;
    }

    return (
        <div id="Weather">
            <GlobalStyle />
            <List className="list">
                <CityInput inputRef={cityInputRef} onInput={changeCity} />
                <Loading active={loading} />
            </List>
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
        </div>
    );
}
