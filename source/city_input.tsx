import * as React from "react";


interface CityInputProps {
    onEnterPress: (cityName: string) => void;
}

interface CityInputState {

}


class CityInput extends React.Component <CityInputProps, CityInputState> {

    constructor( props: CityInputProps ) {
        super( props );
        this.keyPress = this.keyPress.bind( this );
    }


    keyPress( event: React.KeyboardEvent <HTMLInputElement> ) {

        switch( event.which ) {
            case 13:    // enter
                let input = event.target as HTMLInputElement;
                let name = input.value;

                if ( name === '' ) {
                    return;
                }

                input.value = '';   // clear after every query
                this.props.onEnterPress( name );
                break;
        }
    }


    render() {
        return (
            <input type="text" placeholder="City name.." onKeyPress= { this.keyPress }></input>
        );
    }
}


export default CityInput;