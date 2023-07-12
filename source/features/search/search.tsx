import { CityInput } from "./city_input/city_input";
import Loading from "../../components/loading/loading";
import { List } from "./search.styles";

export type SearchProps = {
    querying: boolean;
    onInput: (city: string) => Promise<boolean>;
};

export function Search({ onInput, querying }: SearchProps) {
    return (
        <List className="list">
            <CityInput onInput={onInput} />
            <Loading active={querying} />
        </List>
    );
}
