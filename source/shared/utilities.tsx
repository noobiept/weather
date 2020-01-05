/**
 * Receives a date and returns a string in the "--h:--m" format.
 */
export function toHourMinute(unixTime: number | Date) {
    let date = new Date(unixTime);

    return `${date.getHours()}h ${date.getMinutes()}m`;
}
