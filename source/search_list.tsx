import * as React from "react";
import { saveToStorage, getFromStorage } from "./data";

interface SearchListProps {
    onItemClick: (cityName: string, addToList: boolean) => void;
    limit: number; // maximum number of elements in the list
}

interface SearchListState {
    cityNames: string[]; // list with all the city names that were searched for
    selectedPosition: number; // position of the currently selected city name element
}

export default class SearchList extends React.Component<
    SearchListProps,
    SearchListState
> {
    constructor(props: SearchListProps) {
        super(props);

        // load the data from local storage
        let cities = getFromStorage("weather_search_list");
        let selected = getFromStorage("weather_selected_position");

        if (!cities) {
            cities = [];
        }

        if (typeof selected !== "number") {
            selected = -1;
        }

        this.state = {
            cityNames: cities,
            selectedPosition: selected,
        };
    }

    componentWillMount() {
        // load the city that was opened in the previous session
        if (this.state.selectedPosition >= 0) {
            let name = this.state.cityNames[this.state.selectedPosition];
            this.props.onItemClick(name, false);
        }
    }

    add(name: string) {
        let updated = this.state.cityNames.slice();
        updated.push(name);

        // if we get past the limit, remove the older entry (at the start of the array)
        if (updated.length > this.props.limit) {
            updated.splice(0, 1);
        }

        let position = updated.length - 1;
        this.setState({
            cityNames: updated,
            selectedPosition: position,
        });

        saveToStorage("weather_search_list", updated);
        saveToStorage("weather_selected_position", position);
    }

    open(position: number) {
        this.setState({
            selectedPosition: position,
        });

        this.props.onItemClick(this.state.cityNames[position], false);
        saveToStorage("weather_selected_position", position);
    }

    render() {
        let citySearches = [];

        for (let a = 0; a < this.state.cityNames.length; a++) {
            let name = this.state.cityNames[a];
            let position = a;
            let clickHandler = () => {
                this.open(position);
            };
            let cssClass = "button";

            if (a === this.state.selectedPosition) {
                cssClass += " selected";
            }

            citySearches.push(
                <li key={a} className={cssClass} onClick={clickHandler}>
                    {name}
                </li>
            );
        }

        return (
            <div id="PreviousSearches">
                Previous searches:{" "}
                {citySearches.length ? (
                    <ul className="horizontalList">{citySearches}</ul>
                ) : (
                    "---"
                )}
            </div>
        );
    }
}
