export interface CityInputProps {
    onInput: (cityName: string) => Promise<boolean>;
    inputRef: React.RefObject<HTMLInputElement>;
}
