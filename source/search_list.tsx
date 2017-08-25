import * as React from "react";


interface SearchListProps {
    onItemClick: ( cityName: string, addToList: boolean ) => void;
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
                <a key= { a } className= { cssClass } onClick= { clickHandler }>{ name }</a>
            );
        }

        return (
            <div>Previous searches: { citySearches.length ? citySearches : '---' }</div>
        );
    }
}

export default SearchList;