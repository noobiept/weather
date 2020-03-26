import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CurrentWeather from "./current_weather";
import { toHourMinute } from "../../shared/utilities";
import { getCurrentWeatherData } from "../../tests/fake_data";

describe("CurrentWeather", () => {
    test("Should have the expected elements.", () => {
        const info = getCurrentWeatherData();
        const { container } = render(<CurrentWeather info={info} />);
        const element = container.querySelector("div")!;
        const header = element.querySelector("h1");

        expect(header).toHaveTextContent(`${info.name}, ${info.sys.country}`);

        const weatherCondition = element.querySelector(
            "#CurrentWeatherCondition"
        );
        expect(weatherCondition).toBeInTheDocument();

        const infoList = element.querySelector(".infoList");
        expect(infoList).toBeInTheDocument();

        expect(infoList).toHaveTextContent(info.coord.lat.toString());
        expect(infoList).toHaveTextContent(info.coord.lon.toString());
        expect(infoList).toHaveTextContent(info.main.humidity.toString());
        expect(infoList).toHaveTextContent(info.main.pressure.toString());

        const wind = element.querySelector(".wind");
        expect(wind).toBeInTheDocument();

        const sunrise = element.querySelector("#SunriseValue");
        const sunset = element.querySelector("#SunsetValue");
        const sunriseValue = toHourMinute(info.sys.sunrise * 1000);
        const sunsetValue = toHourMinute(info.sys.sunset * 1000);

        expect(sunrise).toHaveTextContent(sunriseValue);
        expect(sunset).toHaveTextContent(sunsetValue);

        const lastUpdated = new Date(info.dt * 1000);
        const hourMinutes = toHourMinute(lastUpdated);
        const lastUpdatedElement = element.querySelector(
            "#LastUpdated"
        ) as HTMLElement;

        expect(lastUpdatedElement.title).toBe(lastUpdated.toString());
        expect(lastUpdatedElement).toHaveTextContent("Last updated:");

        const lastUpdatedValue = lastUpdatedElement.querySelector(".value");
        expect(lastUpdatedValue).toHaveTextContent(hourMinutes);
    });
});
