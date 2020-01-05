import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Forecast from "../../source/components/forecast";
import { getCurrentForecastData } from "../fake_data";

describe("Forecast", () => {
    test("Should have the expected elements.", () => {
        const info = getCurrentForecastData();
        const { container } = render(<Forecast info={info} />);
        const element = container.querySelector("div");

        const header = element.querySelector("h1");
        expect(header).toHaveTextContent("Forecast");

        const list = element.querySelector(".horizontalList");
        const listElements = [
            "Temperature",
            "Humidity",
            "Pressure",
            "Wind speed",
        ];

        Array.from(list.children).forEach((child, index) => {
            expect(child).toHaveTextContent(listElements[index]);
        });

        const chart = element.querySelector(".chartCanvas");
        expect(chart).toBeInTheDocument();

        const weatherList = element.querySelector("#WeatherList");
        expect(weatherList.childElementCount).toBe(info.list.length);

        Array.from(weatherList.children).forEach((child, index) => {
            const childInfo = info.list[index];

            expect(child.classList.contains("weatherItem")).toBe(true);

            const date = child.querySelector(".date");
            expect(date).toHaveTextContent(childInfo.dt_txt);

            const weatherCondition = child.querySelector(".weatherCondition");
            expect(weatherCondition).toBeInTheDocument();

            expect(child).toHaveTextContent(`Humidity:`);
            expect(child).toHaveTextContent(`${childInfo.main.humidity} %`);
            expect(child).toHaveTextContent(`Pressure:`);
            expect(child).toHaveTextContent(`${childInfo.main.pressure} hPa`);

            const wind = child.querySelector(".wind");
            expect(wind).toBeInTheDocument();
        });
    });
});
