import CityInput from "../../components/city_input/city_input";
import Loading from "../../components/loading/loading";
import { List } from "./search.styles";

export type SearchProps = {
    querying: boolean;
    onInput: (city: string) => Promise<boolean>;
    cityInputRef: React.RefObject<HTMLInputElement>; // TODO shouldn't need this?
};

export function Search({ onInput, querying, cityInputRef }: SearchProps) {
    return (
        <List className="list">
            <CityInput inputRef={cityInputRef} onInput={onInput} />
            <Loading active={querying} />
        </List>
    );
}
