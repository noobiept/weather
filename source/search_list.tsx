import * as React from "react";


interface SearchListProps {
    onItemClick: ( cityName: string, addToList: boolean ) => void;
    limit: number;              // maximum number of elements in the list
}

interface SearchListState {
    cityNames: string[];        // list with all the city names that were searched for
    selectedPosition: number;   // position of the currently selected city name element
}


class SearchList extends React.Component <SearchListProps, SearchListState> {

    constructor() {
        super();

        this.state = {
            cityNames: [],
            selectedPosition: -1
        }
    }


    add( name: string ) {
        let updated = this.state.cityNames.slice();
        updated.push( name );

            // if we get past the limit, remove the older entry (at the start of the array)
        if ( updated.length > this.props.limit ) {
            updated.splice( 0, 1 );
        }

        this.setState({
            cityNames: updated,
            selectedPosition: updated.length - 1
        });
    }


    open( position: number ) {
        this.setState({
            selectedPosition: position
        });

        this.props.onItemClick( this.state.cityNames[ position ], false );
    }


    render() {

        let citySearches = [];

        for (let a = 0 ; a < this.state.cityNames.length ; a++) {
            let name = this.state.cityNames[ a ];
            let position = a;
            let clickHandler = () => { this.open( position ); };
            let cssClass = 'button';

            if ( a === this.state.selectedPosition ) {
                cssClass += ' selected';
            }

            citySearches.push(
                <li key= { a } className= { cssClass } onClick= { clickHandler }>{ name }</li>
            );
        }

        return (
            <div id="PreviousSearches">Previous searches: { citySearches.length ? <ul className="horizontalList">{ citySearches }</ul> : '---' }</div>
        );
    }
}

export default SearchList;