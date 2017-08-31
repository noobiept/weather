export function padStart( str: string, length: number, padString= ' ' ) {
    let fillLength = length - str.length;

    if ( fillLength < 1 ) {
        return str;
    }

    return padString.repeat( fillLength ) + str;
}