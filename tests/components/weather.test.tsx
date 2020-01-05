import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Weather from "../../source/components/weather";

describe("Weather", () => {
    test("Should have the expected elements.", () => {
        const { container } = render(<Weather />);
        const element = container.querySelector("#Weather");

        const list = element.querySelector(".list");
        const input = list.querySelector("#CityInput");
        const loading = list.querySelector(".loading");

        expect(input).toBeInTheDocument();
        expect(loading).toBeInTheDocument();

        const message = element.querySelector(".message");
        expect(message).toBeInTheDocument();

        const searchList = element.querySelector("#PreviousSearches");
        expect(searchList).toBeInTheDocument();

        // empty cities list, so it shows the help
        const help = element.querySelector(".help");
        expect(help).toBeInTheDocument();
    });
});
