import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {
    getCurrentWeather,
    getCurrentForecast,
} from "../../source/shared/requests";
import { mockRequests } from "../mocks";

beforeAll(() => {
    mockRequests();
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
