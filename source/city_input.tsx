import * as React from "react";
import Message from "./message";


interface CityInputProps {
    name?: string;
    message?: string;
    onKeyPress: (event: React.KeyboardEvent <HTMLInputElement>) => void;
}

interface CityInputState {

}


class CityInput extends React.Component <CityInputProps, CityInputState> {

    constructor() {
        super();
    }


    render() {
        let name = this.props.name;

        return (
            <div>
                <div>Location: { name ? name : '---' }</div>
                <input type="text" onKeyPress= { this.props.onKeyPress }></input>
                <Message text= { this.props.message } />
            </div>
        );
    }
}


export default CityInput