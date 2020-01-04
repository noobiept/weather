import React from "react";

interface CityInputProps {
    onInput: (cityName: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

export default function CityInput({ onInput, inputRef }: CityInputProps) {
    /**
     * Perform a search when the `enter` key is pressed.
     */
    function keyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        switch (event.which) {
            case 13: // enter
                search();
                break;
        }
    }

    /**
     * Check if the input element has some value and if so, call the given `onInput` callback.
     */
    function search() {
        const input = inputRef.current;
        if (!input) {
            return;
        }

        const name = input.value;

        input.value = ""; // clear after every query
        onInput(name);
    }

    return (
        <div id="CityInput">
            <input
                type="text"
                placeholder="City name.."
                ref={inputRef}
                onKeyPress={keyPress}
            />
            <button onClick={search}>Search</button>
        </div>
    );
}
