/**
 * The data that is stored in the local storage.
 */
export interface Data {
    weather_search_list?: string[];
    weather_selected_position?: number;
}

/**
 * Returns an object that was obtained by parsing (with json) some data that was saved on `localStorage`.
 */
export function getFromStorage<T extends keyof Data>(
    key: T
): Data[T] | undefined {
    var value = localStorage.getItem(key);

    return value && JSON.parse(value);
}

/**
 * Saves in the `localStorage` a json string representation of the `value`.
 */
export function saveToStorage<T extends keyof Data>(key: T, value: Data[T]) {
    localStorage.setItem(key, JSON.stringify(value));
}
