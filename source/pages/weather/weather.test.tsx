import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Weather } from "./weather";
import { mockRequests } from "../../tests/mocks";

beforeAll(() => {
    window.fetch = mockRequests();
});

describe("Weather", () => {
    test("Should have the expected elements.", () => {
        const { container } = render(<Weather />);
        const element = container.querySelector("#Weather")!;

        const list = element.querySelector(".list")!;
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

    test("Searching for a city.", async () => {
        const { container } = render(<Weather />);

        const city = "porto";
        const input = container.querySelector("#CityInput input")!;
        const button = container.querySelector("#CityInput button")!;

        fireEvent.change(input, { target: { value: city } });
        fireEvent.click(button);

        await waitFor(() =>
            expect(
                container.querySelector("#WeatherInfoContainer")
            ).toBeInTheDocument()
        );
    });

    test("Search with a query below the limit.", async () => {
        const { container } = render(<Weather />);

        const city = "123";
        const input = container.querySelector("#CityInput input")!;
        const button = container.querySelector("#CityInput button")!;

        fireEvent.change(input, { target: { value: city } });
        fireEvent.click(button);

        const weatherInfo = await waitFor(() =>
            container.querySelector("#WeatherInfoContainer")
        );

        expect(weatherInfo).toBeInTheDocument();

        const message = container.querySelector(".message");
        expect(message).toHaveTextContent(
            "The query needs to have more than 3 characters."
        );
    });
});
