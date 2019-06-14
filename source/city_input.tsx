import * as React from "react";

interface CityInputProps {
    onInput: (cityName: string) => void;
}

interface CityInputState {}

export default class CityInput extends React.Component<
    CityInputProps,
    CityInputState
> {
    inputRef: React.RefObject<HTMLInputElement>;

    constructor(props: CityInputProps) {
        super(props);

        this.inputRef = React.createRef();
        this.search = this.search.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    /**
     * Perform a search when the `enter` key is pressed.
     */
    keyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        switch (event.which) {
            case 13: // enter
                this.search();
                break;
        }
    }

    /**
     * Check if the input element has some value and if so, call the given `onInput` callback.
     */
    search() {
        const input = this.inputRef.current;
        if (!input) {
            return;
        }

        const name = input.value;
        if (name === "") {
            return;
        }

        input.value = ""; // clear after every query
        this.props.onInput(name);
    }

    /**
     * Put the focus on the `input` html element.
     */
    gainFocus() {
        const input = this.inputRef.current;

        if (input) {
            input.focus();
        }
    }

    render() {
        return (
            <div id="CityInput">
                <input
                    type="text"
                    placeholder="City name.."
                    ref={this.inputRef}
                    onKeyPress={this.keyPress}
                />
                <button onClick={this.search}>Search</button>
            </div>
        );
    }
}
