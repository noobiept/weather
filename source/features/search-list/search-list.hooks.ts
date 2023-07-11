import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../../shared/data";
import { SEARCH_LIMIT } from "./search-list.const";

/**
 * Keeps track of the current list of cities that were searched.
 * Loads initially a list of previous searches from the storage.
 */
export function useSearchList() {
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState<string[]>([]); // list with all the city names that were searched for
    const [position, setPosition] = useState(-1); // position of the currently selected city name element

    useEffect(() => {
        const loadedCities = getFromStorage("weather_search_list") ?? [];
        const loadedPosition =
            getFromStorage("weather_selected_position") ?? -1;

        // load the last city that was selected in the previous session
        if (loadedCities.length !== 0 && loadedPosition >= 0) {
            setCities(loadedCities);
            setPosition(loadedPosition);
        }

        setLoading(false);
    }, []);

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
        if (updated.length > SEARCH_LIMIT) {
            updated.splice(0, 1);
            position--;
        }

        setCities(updated);
        saveToStorage("weather_search_list", updated);

        return position;
    }

    /**
     * Set a new selected city position.
     */
    function updateCityPosition(position: number) {
        setPosition(position);
        saveToStorage("weather_selected_position", position);
    }

    return {
        loading,
        cities,
        position,
        updateCityPosition,
        addCityName,
    };
}
