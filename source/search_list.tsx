import * as React from "react";

interface SearchListProps {
    onItemClick: (cityName: string, existingPosition?: number) => void;
    cityNames: string[];
    selectedPosition: number;
}

interface SearchListState {}

export default class SearchList extends React.Component<
    SearchListProps,
    SearchListState
> {
    open(position: number) {
        this.setState({
            selectedPosition: position,
        });

        this.props.onItemClick(this.props.cityNames[position], position);
    }

    render() {
        let citySearches = [];

        for (let a = 0; a < this.props.cityNames.length; a++) {
            let name = this.props.cityNames[a];
            let position = a;
            let clickHandler = () => {
                this.open(position);
            };
            let cssClass = "button";

            if (a === this.props.selectedPosition) {
                cssClass += " selected";
            }

            citySearches.push(
                <li key={a} className={cssClass} onClick={clickHandler}>
                    {name}
                </li>
            );
        }

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
}
