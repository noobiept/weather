import { useRef, useEffect } from "react";
import { Global } from "@emotion/react";

import Message from "../message/message";
import CurrentWeather from "../current_weather/current_weather";
import Forecast from "../forecast/forecast";
import Help from "../help/help";
import {
    WeatherInfoContainer,
    InitialLoading,
    globalStyle,
} from "./weather.styles";
import { gainFocus } from "../../shared/utilities";
import { Search } from "../../features/search/search";
import { SearchList, useSearchList } from "../../features/search-list";
import { useSearch } from "../../features/search";

export default function Weather() {
    const cityInputRef = useRef<HTMLInputElement>(null);
    const { cities, loading, position, updateList } = useSearchList();

    const { search, querying, error, current, forecast } =
        useSearch(updateList);

    useEffect(() => {
        if (!loading && cities.length !== 0 && position >= 0) {
            const name = cities[position];
            search(name, position, false);
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

    return (
        <div id="Weather">
            <Global styles={globalStyle} />
            {loading ? (
                <InitialLoading active />
            ) : (
                <>
                    <Search
                        onInput={search}
                        cityInputRef={cityInputRef}
                        querying={querying}
                    />
                    <Message text={error} />
                    <SearchList
                        cityNames={cities}
                        selectedPosition={position}
                        onItemClick={search}
                    />

                    {cities.length !== 0 ? (
                        <WeatherInfoContainer id="WeatherInfoContainer">
                            {current && (
                                <CurrentWeather
                                    key={"current." + current.name}
                                    info={current}
                                />
                            )}
                            {forecast && (
                                <Forecast
                                    key={"forecast." + forecast.city.name}
                                    info={forecast}
                                />
                            )}
                        </WeatherInfoContainer>
                    ) : (
                        <Help />
                    )}
                </>
            )}
        </div>
    );
}
