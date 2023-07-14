import { useEffect } from "react";
import { Global } from "@emotion/react";

import { Message } from "../../components/message";
import { Forecast } from "../../features/forecast";
import { Help } from "../../components/help";
import {
    WeatherInfoContainer,
    InitialLoading,
    globalStyle,
} from "./weather.styles";
import { SearchList, useSearchList } from "../../features/search-list";
import { useSearch, Search } from "../../features/search";
import { CurrentWeather } from "../../features/current-weather";

export function Weather() {
    const { cities, loading, position, updateList } = useSearchList();

    const { search, querying, error, current, forecast } =
        useSearch(updateList);

    useEffect(() => {
        if (!loading && cities.length !== 0 && position >= 0) {
            const name = cities[position];
            search(name, position, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    return (
        <div id="Weather">
            <Global styles={globalStyle} />
            {loading ? (
                <InitialLoading active />
            ) : (
                <>
                    <Search onInput={search} querying={querying} />
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
