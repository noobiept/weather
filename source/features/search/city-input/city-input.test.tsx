import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { CityInput } from "./city-input";

describe("CityInput", () => {
    test("Should have the expected elements.", () => {
        const props = {
            onInput: jest.fn(),
        };
        const { container } = render(<CityInput {...props} />);
        const main = container.querySelector("#CityInput")!;
        const input = main.querySelector("input")!;
        const button = main.querySelector("button");

        expect(main).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        expect(input.placeholder).toBe("City name..");
        expect(input.type).toBe("text");
        expect(button).toHaveTextContent("Search");
    });

    test("Should search on button press.", () => {
        const text = "test";
        const props = {
            onInput: jest.fn((name) => {
                expect(name).toBe(text);
                return new Promise<boolean>((resolve) => resolve(true));
            }),
            inputRef: React.createRef<HTMLInputElement>(),
        };
        const { container } = render(<CityInput {...props} />);
        const main = container.querySelector("#CityInput")!;
        const input = main.querySelector("input")!;
        const button = main.querySelector("button")!;

        fireEvent.change(input, { target: { value: text } });
        fireEvent.click(button);

        expect(props.onInput).toHaveBeenCalled();
    });

    test("Should search when the 'enter' key is pressed.", () => {
        const text = "test";
        const props = {
            onInput: jest.fn((name) => {
                expect(name).toBe(text);
                return new Promise<boolean>((resolve) => resolve(true));
            }),
            inputRef: React.createRef<HTMLInputElement>(),
        };
        const { container } = render(<CityInput {...props} />);
        const main = container.querySelector("#CityInput")!;
        const input = main.querySelector("input")!;

        fireEvent.change(input, { target: { value: text } });
        fireEvent.keyPress(input, {
            key: "Enter",
            code: "Enter",
            charCode: 13,
        });

        expect(props.onInput).toHaveBeenCalled();
    });
});
