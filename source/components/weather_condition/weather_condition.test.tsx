import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import WeatherCondition from "./weather_condition";

describe("WeatherCondition", () => {
    test("Should have the expected elements.", () => {
        const props = {
            id: "WeatherCondition",
            temperature: 10,
            weather: [],
        };

        const { container } = render(<WeatherCondition {...props} />);

        const topElement = container.querySelector(`#${props.id}`);
        expect(topElement).toBeInTheDocument();

        const temperatureValue = container.querySelector(".temperatureValue");
        expect(temperatureValue).toHaveTextContent(
            props.temperature.toString()
        );
    });
});
