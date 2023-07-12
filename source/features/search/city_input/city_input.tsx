import React from "react";
import { Container } from "./city_input.styles";
import { CityInputProps } from "./city_input.types";
import { useFocusOnKeyPress } from "./city_input.hooks";

export function CityInput({ onInput }: CityInputProps) {
    const ref = useFocusOnKeyPress();

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
        const input = ref.current;
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
                ref={ref}
                onKeyPress={keyPress}
            />
            <button onClick={search}>Search</button>
        </Container>
    );
}
