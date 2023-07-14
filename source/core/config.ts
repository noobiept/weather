const hosts = {
    openWeather: "https://api.openweathermap.org",
};

// TODO open weather api calls should be done through a server to not expose the key
const keys = {
    openWeather: "8cffe81fbe82ac71521e0cf28f0f3496",
};

const units = "metric";

export const Endpoints = {
    currentWeather: (query: string) =>
        `${hosts.openWeather}/data/2.5/weather?q=${query}&appid=${keys.openWeather}&units=${units}`,
    forecast: (query: string) =>
        `${hosts.openWeather}/data/2.5/forecast?q=${query}&appid=${keys.openWeather}&units=${units}`,
};
