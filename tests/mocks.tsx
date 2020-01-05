import { getCurrentWeatherData, getCurrentForecastData } from "./fake_data";

export function mockRequests() {
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
}
