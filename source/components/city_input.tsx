import React from "react";
import styled from "styled-components";

const Container = styled.div`
    & > * {
        vertical-align: middle;
        box-sizing: content-box;
        padding: 5px;
        margin: 0;
    }
`;

interface CityInputProps {
    onInput: (cityName: string) => Promise<boolean>;
    inputRef: React.RefObject<HTMLInputElement>;
}

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
