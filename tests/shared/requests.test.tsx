import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {
    getCurrentWeather,
    getCurrentForecast,
} from "../../source/shared/requests";
import { mockRequests, mockFailedRequest } from "../mocks";

beforeAll(() => {
    window.fetch = mockRequests();
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

    test("Should return undefined if status is not 200.", async () => {
        const previous = window.fetch;
        window.fetch = mockFailedRequest();

        const info1 = await getCurrentWeather("-");
        expect(info1).toBeUndefined();

        const info2 = await getCurrentForecast("-");
        expect(info2).toBeUndefined();

        window.fetch = previous;
    });
});
