import React from "react";
import { Container } from "./city_input.styles";
import { CityInputProps } from "./city_input.types";

export default function CityInput({ onInput, inputRef }: CityInputProps) {
    /**
     * Perform a search when the `enter` key is pressed.
     */
    function keyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        switch (event.key) {
            case "Enter":
                search();
                break;
        }
    }

    /**
     * Check if the input element has some value and if so, call the given `onInput` callback.
     */
    async function search() {
        const input = inputRef.current;
        if (!input) {
            return;
        }

        const name = input.value;
        const success = await onInput(name);

        // clear after every successful query
        if (success) {
            input.value = "";
        }
    }

    return (
        <Container id="CityInput">
            <input
                type="text"
                placeholder="City name.."
                ref={inputRef}
                onKeyPress={keyPress}
            />
            <button onClick={search}>Search</button>
        </Container>
    );
}
