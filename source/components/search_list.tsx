import React, { Fragment } from "react";
import styled from "styled-components";
import { ListItem } from "../shared/styles";

const PreviousSearches = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

interface SearchListProps {
    onItemClick: (cityName: string, existingPosition?: number) => void;
    cityNames: string[];
    selectedPosition: number;
}

export default function SearchList({
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
                <ListItem selected={selected} onClick={clickHandler}>
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
                    <ul className="horizontalList">{citySearches}</ul>
                </>
            )}
        </PreviousSearches>
    );
}
