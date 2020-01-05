import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CurrentWeather from "../../source/components/current_weather";
import { toHourMinute } from "../../source/shared/utilities";

describe("CurrentWeather", () => {
    test("Should have the expected elements.", () => {
        const info = {
            coord: { lon: -8.61, lat: 41.15 },
            weather: [
                {
                    id: 800,
                    main: "Clear",
                    description: "clear sky",
                    icon: "01d",
                },
            ],
            base: "stations",
            main: {
                temp: 12.5,
                feels_like: 9.45,
                temp_min: 10.56,
                temp_max: 15.56,
                pressure: 1029,
                humidity: 58,
            },
            visibility: 10000,
            wind: { speed: 2.6, deg: 100 },
            clouds: { all: 0 },
            dt: 1578233888,
            sys: {
                type: 1,
                id: 6900,
                country: "PT",
                sunrise: 1578211193,
                sunset: 1578244732,
            },
            timezone: 0,
            id: 2735943,
            name: "Porto",
            cod: 200,
        };
        const { container } = render(<CurrentWeather info={info} />);
        const element = container.querySelector("div");
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
