import React from "react";

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

        return (
            <li key={index} className={cssClass} onClick={clickHandler}>
                {name}
            </li>
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
