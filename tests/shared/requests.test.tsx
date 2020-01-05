import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {
    getCurrentWeather,
    getCurrentForecast,
} from "../../source/shared/requests";
import { getCurrentWeatherData, getCurrentForecastData } from "../fake_data";

beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(async (url: string) => {
        if (url.includes("weather?")) {
            return Promise.resolve({
                status: 200,
                json: () => getCurrentWeatherData(),
            });
        }

        if (url.includes("forecast?")) {
            return Promise.resolve({
                status: 200,
                json: () => getCurrentForecastData(),
            });
        }

        return Promise.resolve({
            status: 404,
        });
    });
});

describe("Requests", () => {
    test("Get the current weather info.", async () => {
        const info = await getCurrentWeather("-");
        expect(info.name).toBeTruthy();
    });

    test("Get the current forecast info.", async () => {
        const info = await getCurrentForecast("-");
        expect(info.city.name).toBeTruthy();
    });
});
