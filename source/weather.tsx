import * as React from "react";
import * as ReactDOM from "react-dom";

import CityInput from "./city_input";
import Message from "./message";
import CurrentWeather from "./current_weather";
import Forecast from "./forecast";
import SearchList from "./search_list";
import Loading from "./loading";

interface WeatherProps {}

interface WeatherState {
    current: React.ReactElement<CurrentWeather> | undefined;
    forecast: React.ReactElement<Forecast> | undefined;
    messageText: React.ReactElement<HTMLSpanElement> | string; // warn/error message to show to the user
    loading: boolean;
}

export default class Weather extends React.Component<
    WeatherProps,
    WeatherState
> {
    searchList: SearchList | null;

    constructor(props: WeatherProps) {
        super(props);

        this.searchList = null;
        this.changeCity = this.changeCity.bind(this);
        this.state = {
            current: undefined,
            forecast: undefined,
            messageText: "",
            loading: false,
        };
    }

    componentDidMount() {
        // focus the city element element whenever a key is pressed
        window.addEventListener("keypress", () => {
            let input = ReactDOM.findDOMNode(
                this.refs.cityInput
            ) as HTMLInputElement;
            input.focus();
        });
    }

    /**
     * Load a different city weather information.
     */
    async changeCity(name: string, addToList = true) {
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
            if (addToList !== false) {
                this.searchList!.add(current.name);
            }

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

    render() {
        return (
            <div>
                <div className="list">
                    <CityInput ref="cityInput" onInput={this.changeCity} />
                    <Loading active={this.state.loading} />
                </div>
                <div>
                    <Message text={this.state.messageText} />
                </div>
                <SearchList
                    ref={(search) => {
                        this.searchList = search;
                    }}
                    onItemClick={this.changeCity}
                    limit={5}
                />
                <div id="WeatherInfoContainer">
                    {this.state.current}
                    {this.state.forecast}
                </div>
            </div>
        );
    }
}
