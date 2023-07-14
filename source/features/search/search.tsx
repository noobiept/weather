import { CityInput } from "./city-input/city-input";
import { Loading } from "../../components/loading";
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
