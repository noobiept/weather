import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Forecast from "./forecast";
import { getCurrentForecastData } from "../../tests/fake_data";

describe("Forecast", () => {
    test("Should have the expected elements.", () => {
        const info = getCurrentForecastData();
        const { container } = render(<Forecast info={info} />);
        const element = container.querySelector("#Forecast")!;

        const header = element.querySelector("h1");
        expect(header).toHaveTextContent("Forecast");

        const list = element.querySelector(".horizontalList")!;
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

        const weatherList = element.querySelector("#WeatherList")!;
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

    test("Should switch between the different charts.", () => {
        const info = getCurrentForecastData();
        const { container } = render(<Forecast info={info} />);
        const forecast = container.querySelector("#Forecast")!;
        const selectList = forecast.querySelector(".horizontalList")!;

        const temperature = selectList.querySelector("#Forecast_temperature")!;
        fireEvent.click(temperature);
        expect(temperature.classList.contains("selected")).toBe(true);

        const humidity = selectList.querySelector("#Forecast_humidity")!;
        fireEvent.click(humidity);
        expect(humidity.classList.contains("selected")).toBe(true);

        const pressure = selectList.querySelector("#Forecast_pressure")!;
        fireEvent.click(pressure);
        expect(pressure.classList.contains("selected")).toBe(true);

        const windSpeed = selectList.querySelector("#Forecast_windSpeed")!;
        fireEvent.click(windSpeed);
        expect(windSpeed.classList.contains("selected")).toBe(true);
    });
});
