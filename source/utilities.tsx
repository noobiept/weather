/**
 * Convert from degrees to radians.
 */
export function toRadians( degrees: number ) {
    return degrees * Math.PI / 180;
}


/**
 * Receives a date and returns a string in the "--h:--m" format.
 */
export function toHourMinute( unixTime: number | Date ) {
    let date = new Date( unixTime );

    return `${ date.getHours() }h ${ date.getMinutes() }m`;
}


/**
 * Returns an object that was obtained by parsing (with json) some data that was saved on `localStorage`.
 */
export function getFromStorage( key: string ) {
    var value = localStorage.getItem( key );

    return value && JSON.parse( value );
}


/**
 * Saves in the `localStorage` a json string representation of the `value`.
 */
export function saveToStorage( key: string, value: any ) {
    localStorage.setItem( key, JSON.stringify( value ) );
}