import React, { Fragment } from "react";

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
        const cssClass =
            index === selectedPosition ? "button selected" : "button";
        const lastItem = cityNames.length - 1 === index;

        return (
            <Fragment key={index}>
                <li className={cssClass} onClick={clickHandler}>
                    {name}
                </li>
                {!lastItem && <li>/</li>}
            </Fragment>
        );
    });

    return (
        <div id="PreviousSearches">
            {citySearches.length !== 0 && (
                <>
                    <span>Previous searches: </span>
                    <ul className="horizontalList">{citySearches}</ul>
                </>
            )}
        </div>
    );
}
