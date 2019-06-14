import * as React from "react";

import CityInput from "./city_input";
import Message from "./message";
import CurrentWeather from "./current_weather";
import Forecast from "./forecast";
import SearchList from "./search_list";
import Loading from "./loading";
import Help from "./help";
import { getFromStorage, saveToStorage } from "./data";

interface WeatherProps {}

interface WeatherState {
    current: React.ReactElement<CurrentWeather> | undefined;
    forecast: React.ReactElement<Forecast> | undefined;
    messageText: React.ReactElement<HTMLSpanElement> | string; // warn/error message to show to the user
    loading: boolean;
    searchedCities: string[]; // list with all the city names that were searched for
    searchedPosition: number; // position of the currently selected city name element
}

export default class Weather extends React.Component<
    WeatherProps,
    WeatherState
> {
    cityInputRef: React.RefObject<CityInput>;
    searchLimit = 5; // maximum number of elements in the search list

    constructor(props: WeatherProps) {
        super(props);

        const cities = getFromStorage("weather_search_list");
        const position = getFromStorage("weather_selected_position");

        this.cityInputRef = React.createRef();
        this.changeCity = this.changeCity.bind(this);
        this.state = {
            current: undefined,
            forecast: undefined,
            messageText: "",
            loading: false,
            searchedCities: cities ? cities : [],
            searchedPosition: typeof position === "number" ? position : -1,
        };
    }

    componentDidMount() {
        // focus the city element element whenever a key is pressed
        window.addEventListener("keypress", () => {
            const cityInput = this.cityInputRef.current;
            if (cityInput) {
                cityInput.gainFocus();
            }
        });

        // load the last city that was selected in the previous session
        const cities = this.state.searchedCities;
        const position = this.state.searchedPosition;

        if (cities.length !== 0 && position >= 0) {
            const name = cities[position];
            this.changeCity(name, position);
        }
    }

    /**
     * Load a different city weather information.
     * If `existingPosition` is not given, then its a new city that we need to add to the cities list.
     */
    async changeCity(name: string, existingPosition?: number) {
        if (name.length <= 3) {
            this.setState({
                messageText: "The query needs to have more than 3 characters.",
            });
            return;
        }

        this.setState({ loading: true, messageText: "" });

        try {
            var [current, forecast] = await Promise.all([
                await CurrentWeather.getCurrentWeather(name),
                await Forecast.getCurrentWeather(name),
            ]);
        } catch {
            this.setState({
                messageText: (
                    <span className="error">
                        Failed to connect to the weather API.
                    </span>
                ),
            });
            return;
        } finally {
            this.setState({
                loading: false,
            });
        }

        if (current && forecast) {
            // a new city that we need to add
            if (typeof existingPosition === "undefined") {
                existingPosition = this.state.searchedCities.length;
                this.addCityName(current.name);
            }

            this.updateCityPosition(existingPosition);
            this.setState({
                current: (
                    <CurrentWeather
                        key={"current." + current.name}
                        info={current}
                    />
                ),
                forecast: (
                    <Forecast
                        key={"forecast." + forecast.city.name}
                        info={forecast}
                    />
                ),
            });
        } else {
            this.setState({
                messageText: (
                    <span className="error">
                        Couldn't find a city with the name "{name}"
                    </span>
                ),
            });
        }
    }

    /**
     * Set a new selected city position.
     */
    updateCityPosition(position: number) {
        this.setState({
            searchedPosition: position,
        });
        saveToStorage("weather_selected_position", position);
    }

    /**
     * Add a new city to the search list.
     */
    addCityName(name: string) {
        let updated = this.state.searchedCities.slice();
        updated.push(name);

        // if we get past the limit, remove the older entry (at the start of the array)
        if (updated.length > this.searchLimit) {
            updated.splice(0, 1);
        }

        this.setState({
            searchedCities: updated,
        });

        saveToStorage("weather_search_list", updated);
    }

    render() {
        return (
            <div>
                <div className="list">
                    <CityInput
                        ref={this.cityInputRef}
                        onInput={this.changeCity}
                    />
                    <Loading active={this.state.loading} />
                </div>
                <div>
                    <Message text={this.state.messageText} />
                </div>
                <SearchList
                    cityNames={this.state.searchedCities}
                    selectedPosition={this.state.searchedPosition}
                    onItemClick={this.changeCity}
                />

                {this.state.searchedCities.length !== 0 ? (
                    <div id="WeatherInfoContainer">
                        {this.state.current}
                        {this.state.forecast}
                    </div>
                ) : (
                    <Help />
                )}
            </div>
        );
    }
}
