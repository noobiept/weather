import { Fragment } from "react";

import { HorizontalList } from "../../shared/styles";
import { SearchListProps } from "./search-list.types";
import { PreviousSearches } from "./search-list.styles";
import { ListItem } from "../../components/list_item/list_item";

export function SearchList({
    onItemClick,
    cityNames,
    selectedPosition,
}: SearchListProps) {
    function open(position: number) {
        onItemClick(cityNames[position], position);
    }

    const citySearches = cityNames.map((name, index) => {
        const clickHandler = () => {
            open(index);
        };
        const selected = index === selectedPosition;
        const lastItem = cityNames.length - 1 === index;

        return (
            <Fragment key={index}>
                <ListItem
                    selected={selected}
                    onClick={clickHandler}
                    testId="searchItem"
                >
                    {name}
                </ListItem>
                {!lastItem && <li>/</li>}
            </Fragment>
        );
    });

    return (
        <PreviousSearches id="PreviousSearches">
            {citySearches.length !== 0 && (
                <>
                    <span>Previous searches: </span>
                    <HorizontalList className="horizontalList">
                        {citySearches}
                    </HorizontalList>
                </>
            )}
        </PreviousSearches>
    );
}
