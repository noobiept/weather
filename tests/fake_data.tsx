export function getCurrentWeatherData() {
    return {
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
}

export function getCurrentForecastData() {
    return {
        cod: "200",
        message: 0,
        cnt: 40,
        list: [
            {
                dt: 1578236400,
                main: {
                    temp: 13.43,
                    feels_like: 10.27,
                    temp_min: 13.43,
                    temp_max: 13.65,
                    pressure: 1028,
                    sea_level: 1028,
                    grnd_level: 1008,
                    humidity: 46,
                    temp_kf: -0.22,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 2.13, deg: 305 },
                sys: { pod: "d" },
                dt_txt: "2020-01-05 15:00:00",
            },
            {
                dt: 1578247200,
                main: {
                    temp: 9.83,
                    feels_like: 7.39,
                    temp_min: 9.83,
                    temp_max: 10,
                    pressure: 1029,
                    sea_level: 1029,
                    grnd_level: 1009,
                    humidity: 61,
                    temp_kf: -0.17,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.25, deg: 312 },
                sys: { pod: "n" },
                dt_txt: "2020-01-05 18:00:00",
            },
            {
                dt: 1578258000,
                main: {
                    temp: 8.61,
                    feels_like: 6.18,
                    temp_min: 8.61,
                    temp_max: 8.72,
                    pressure: 1029,
                    sea_level: 1029,
                    grnd_level: 1009,
                    humidity: 68,
                    temp_kf: -0.11,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.34, deg: 95 },
                sys: { pod: "n" },
                dt_txt: "2020-01-05 21:00:00",
            },
            {
                dt: 1578268800,
                main: {
                    temp: 7.64,
                    feels_like: 5.41,
                    temp_min: 7.64,
                    temp_max: 7.7,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1009,
                    humidity: 72,
                    temp_kf: -0.06,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.02, deg: 96 },
                sys: { pod: "n" },
                dt_txt: "2020-01-06 00:00:00",
            },
            {
                dt: 1578279600,
                main: {
                    temp: 7.03,
                    feels_like: 4.5,
                    temp_min: 7.03,
                    temp_max: 7.03,
                    pressure: 1028,
                    sea_level: 1028,
                    grnd_level: 1008,
                    humidity: 72,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.31, deg: 86 },
                sys: { pod: "n" },
                dt_txt: "2020-01-06 03:00:00",
            },
            {
                dt: 1578290400,
                main: {
                    temp: 6.57,
                    feels_like: 4.17,
                    temp_min: 6.57,
                    temp_max: 6.57,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1010,
                    humidity: 70,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 0.92, deg: 73 },
                sys: { pod: "n" },
                dt_txt: "2020-01-06 06:00:00",
            },
            {
                dt: 1578301200,
                main: {
                    temp: 7,
                    feels_like: 4.31,
                    temp_min: 7,
                    temp_max: 7,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1010,
                    humidity: 66,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.24, deg: 84 },
                sys: { pod: "d" },
                dt_txt: "2020-01-06 09:00:00",
            },
            {
                dt: 1578312000,
                main: {
                    temp: 11.92,
                    feels_like: 9.63,
                    temp_min: 11.92,
                    temp_max: 11.92,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1010,
                    humidity: 49,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02d",
                    },
                ],
                clouds: { all: 17 },
                wind: { speed: 0.77, deg: 24 },
                sys: { pod: "d" },
                dt_txt: "2020-01-06 12:00:00",
            },
            {
                dt: 1578322800,
                main: {
                    temp: 12.69,
                    feels_like: 9.41,
                    temp_min: 12.69,
                    temp_max: 12.69,
                    pressure: 1029,
                    sea_level: 1029,
                    grnd_level: 1010,
                    humidity: 50,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 59 },
                wind: { speed: 2.42, deg: 327 },
                sys: { pod: "d" },
                dt_txt: "2020-01-06 15:00:00",
            },
            {
                dt: 1578333600,
                main: {
                    temp: 9.56,
                    feels_like: 7.04,
                    temp_min: 9.56,
                    temp_max: 9.56,
                    pressure: 1031,
                    sea_level: 1031,
                    grnd_level: 1011,
                    humidity: 75,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03n",
                    },
                ],
                clouds: { all: 30 },
                wind: { speed: 2.1, deg: 350 },
                sys: { pod: "n" },
                dt_txt: "2020-01-06 18:00:00",
            },
            {
                dt: 1578344400,
                main: {
                    temp: 7.98,
                    feels_like: 5.96,
                    temp_min: 7.98,
                    temp_max: 7.98,
                    pressure: 1032,
                    sea_level: 1032,
                    grnd_level: 1011,
                    humidity: 79,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02n",
                    },
                ],
                clouds: { all: 22 },
                wind: { speed: 1.15, deg: 66 },
                sys: { pod: "n" },
                dt_txt: "2020-01-06 21:00:00",
            },
            {
                dt: 1578355200,
                main: {
                    temp: 6.92,
                    feels_like: 4.25,
                    temp_min: 6.92,
                    temp_max: 6.92,
                    pressure: 1033,
                    sea_level: 1033,
                    grnd_level: 1013,
                    humidity: 73,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02n",
                    },
                ],
                clouds: { all: 11 },
                wind: { speed: 1.53, deg: 83 },
                sys: { pod: "n" },
                dt_txt: "2020-01-07 00:00:00",
            },
            {
                dt: 1578366000,
                main: {
                    temp: 6.31,
                    feels_like: 3.19,
                    temp_min: 6.31,
                    temp_max: 6.31,
                    pressure: 1032,
                    sea_level: 1032,
                    grnd_level: 1011,
                    humidity: 62,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.53, deg: 96 },
                sys: { pod: "n" },
                dt_txt: "2020-01-07 03:00:00",
            },
            {
                dt: 1578376800,
                main: {
                    temp: 5.99,
                    feels_like: 2.87,
                    temp_min: 5.99,
                    temp_max: 5.99,
                    pressure: 1032,
                    sea_level: 1032,
                    grnd_level: 1012,
                    humidity: 59,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02n",
                    },
                ],
                clouds: { all: 14 },
                wind: { speed: 1.34, deg: 76 },
                sys: { pod: "n" },
                dt_txt: "2020-01-07 06:00:00",
            },
            {
                dt: 1578387600,
                main: {
                    temp: 6.48,
                    feels_like: 3.21,
                    temp_min: 6.48,
                    temp_max: 6.48,
                    pressure: 1033,
                    sea_level: 1033,
                    grnd_level: 1013,
                    humidity: 59,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02d",
                    },
                ],
                clouds: { all: 21 },
                wind: { speed: 1.64, deg: 96 },
                sys: { pod: "d" },
                dt_txt: "2020-01-07 09:00:00",
            },
            {
                dt: 1578398400,
                main: {
                    temp: 12.31,
                    feels_like: 9.62,
                    temp_min: 12.31,
                    temp_max: 12.31,
                    pressure: 1033,
                    sea_level: 1033,
                    grnd_level: 1013,
                    humidity: 43,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02d",
                    },
                ],
                clouds: { all: 13 },
                wind: { speed: 1.02, deg: 334 },
                sys: { pod: "d" },
                dt_txt: "2020-01-07 12:00:00",
            },
            {
                dt: 1578409200,
                main: {
                    temp: 13.8,
                    feels_like: 10.86,
                    temp_min: 13.8,
                    temp_max: 13.8,
                    pressure: 1031,
                    sea_level: 1031,
                    grnd_level: 1011,
                    humidity: 43,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 801,
                        main: "Clouds",
                        description: "few clouds",
                        icon: "02d",
                    },
                ],
                clouds: { all: 14 },
                wind: { speed: 1.68, deg: 336 },
                sys: { pod: "d" },
                dt_txt: "2020-01-07 15:00:00",
            },
            {
                dt: 1578420000,
                main: {
                    temp: 10.27,
                    feels_like: 7.9,
                    temp_min: 10.27,
                    temp_max: 10.27,
                    pressure: 1031,
                    sea_level: 1031,
                    grnd_level: 1011,
                    humidity: 60,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03n",
                    },
                ],
                clouds: { all: 26 },
                wind: { speed: 1.2, deg: 357 },
                sys: { pod: "n" },
                dt_txt: "2020-01-07 18:00:00",
            },
            {
                dt: 1578430800,
                main: {
                    temp: 9.26,
                    feels_like: 7.08,
                    temp_min: 9.26,
                    temp_max: 9.26,
                    pressure: 1032,
                    sea_level: 1032,
                    grnd_level: 1012,
                    humidity: 66,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.03, deg: 45 },
                sys: { pod: "n" },
                dt_txt: "2020-01-07 21:00:00",
            },
            {
                dt: 1578441600,
                main: {
                    temp: 8.78,
                    feels_like: 6.19,
                    temp_min: 8.78,
                    temp_max: 8.78,
                    pressure: 1032,
                    sea_level: 1032,
                    grnd_level: 1012,
                    humidity: 62,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 6 },
                wind: { speed: 1.29, deg: 76 },
                sys: { pod: "n" },
                dt_txt: "2020-01-08 00:00:00",
            },
            {
                dt: 1578452400,
                main: {
                    temp: 8.64,
                    feels_like: 5.94,
                    temp_min: 8.64,
                    temp_max: 8.64,
                    pressure: 1031,
                    sea_level: 1031,
                    grnd_level: 1011,
                    humidity: 63,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03n",
                    },
                ],
                clouds: { all: 27 },
                wind: { speed: 1.47, deg: 79 },
                sys: { pod: "n" },
                dt_txt: "2020-01-08 03:00:00",
            },
            {
                dt: 1578463200,
                main: {
                    temp: 8.5,
                    feels_like: 6.03,
                    temp_min: 8.5,
                    temp_max: 8.5,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1010,
                    humidity: 67,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03n",
                    },
                ],
                clouds: { all: 47 },
                wind: { speed: 1.31, deg: 69 },
                sys: { pod: "n" },
                dt_txt: "2020-01-08 06:00:00",
            },
            {
                dt: 1578474000,
                main: {
                    temp: 9.84,
                    feels_like: 7.47,
                    temp_min: 9.84,
                    temp_max: 9.84,
                    pressure: 1031,
                    sea_level: 1031,
                    grnd_level: 1011,
                    humidity: 66,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 53 },
                wind: { speed: 1.45, deg: 78 },
                sys: { pod: "d" },
                dt_txt: "2020-01-08 09:00:00",
            },
            {
                dt: 1578484800,
                main: {
                    temp: 14.66,
                    feels_like: 13.1,
                    temp_min: 14.66,
                    temp_max: 14.66,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1011,
                    humidity: 58,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03d",
                    },
                ],
                clouds: { all: 47 },
                wind: { speed: 1.06, deg: 2 },
                sys: { pod: "d" },
                dt_txt: "2020-01-08 12:00:00",
            },
            {
                dt: 1578495600,
                main: {
                    temp: 15.53,
                    feels_like: 13.9,
                    temp_min: 15.53,
                    temp_max: 15.53,
                    pressure: 1029,
                    sea_level: 1029,
                    grnd_level: 1009,
                    humidity: 63,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03d",
                    },
                ],
                clouds: { all: 39 },
                wind: { speed: 1.85, deg: 335 },
                sys: { pod: "d" },
                dt_txt: "2020-01-08 15:00:00",
            },
            {
                dt: 1578506400,
                main: {
                    temp: 12.39,
                    feels_like: 11.31,
                    temp_min: 12.39,
                    temp_max: 12.39,
                    pressure: 1029,
                    sea_level: 1029,
                    grnd_level: 1010,
                    humidity: 83,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03n",
                    },
                ],
                clouds: { all: 47 },
                wind: { speed: 1.45, deg: 332 },
                sys: { pod: "n" },
                dt_txt: "2020-01-08 18:00:00",
            },
            {
                dt: 1578517200,
                main: {
                    temp: 11.35,
                    feels_like: 10.77,
                    temp_min: 11.35,
                    temp_max: 11.35,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1010,
                    humidity: 93,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 68 },
                wind: { speed: 1, deg: 28 },
                sys: { pod: "n" },
                dt_txt: "2020-01-08 21:00:00",
            },
            {
                dt: 1578528000,
                main: {
                    temp: 10.82,
                    feels_like: 10.29,
                    temp_min: 10.82,
                    temp_max: 10.82,
                    pressure: 1029,
                    sea_level: 1029,
                    grnd_level: 1009,
                    humidity: 93,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 69 },
                wind: { speed: 0.72, deg: 73 },
                sys: { pod: "n" },
                dt_txt: "2020-01-09 00:00:00",
            },
            {
                dt: 1578538800,
                main: {
                    temp: 10.44,
                    feels_like: 9.62,
                    temp_min: 10.44,
                    temp_max: 10.44,
                    pressure: 1028,
                    sea_level: 1028,
                    grnd_level: 1008,
                    humidity: 93,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 802,
                        main: "Clouds",
                        description: "scattered clouds",
                        icon: "03n",
                    },
                ],
                clouds: { all: 48 },
                wind: { speed: 0.99, deg: 93 },
                sys: { pod: "n" },
                dt_txt: "2020-01-09 03:00:00",
            },
            {
                dt: 1578549600,
                main: {
                    temp: 10.91,
                    feels_like: 10.3,
                    temp_min: 10.91,
                    temp_max: 10.91,
                    pressure: 1027,
                    sea_level: 1027,
                    grnd_level: 1008,
                    humidity: 91,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "broken clouds",
                        icon: "04n",
                    },
                ],
                clouds: { all: 55 },
                wind: { speed: 0.74, deg: 119 },
                sys: { pod: "n" },
                dt_txt: "2020-01-09 06:00:00",
            },
            {
                dt: 1578560400,
                main: {
                    temp: 11.87,
                    feels_like: 11.47,
                    temp_min: 11.87,
                    temp_max: 11.87,
                    pressure: 1028,
                    sea_level: 1028,
                    grnd_level: 1009,
                    humidity: 90,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 804,
                        main: "Clouds",
                        description: "overcast clouds",
                        icon: "04d",
                    },
                ],
                clouds: { all: 85 },
                wind: { speed: 0.74, deg: 212 },
                sys: { pod: "d" },
                dt_txt: "2020-01-09 09:00:00",
            },
            {
                dt: 1578571200,
                main: {
                    temp: 12.39,
                    feels_like: 11.22,
                    temp_min: 12.39,
                    temp_max: 12.39,
                    pressure: 1027,
                    sea_level: 1027,
                    grnd_level: 1008,
                    humidity: 92,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10d",
                    },
                ],
                clouds: { all: 92 },
                wind: { speed: 2.18, deg: 187 },
                rain: { "3h": 0.31 },
                sys: { pod: "d" },
                dt_txt: "2020-01-09 12:00:00",
            },
            {
                dt: 1578582000,
                main: {
                    temp: 13.15,
                    feels_like: 11.24,
                    temp_min: 13.15,
                    temp_max: 13.15,
                    pressure: 1026,
                    sea_level: 1026,
                    grnd_level: 1006,
                    humidity: 96,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10d",
                    },
                ],
                clouds: { all: 100 },
                wind: { speed: 3.84, deg: 245 },
                rain: { "3h": 1 },
                sys: { pod: "d" },
                dt_txt: "2020-01-09 15:00:00",
            },
            {
                dt: 1578592800,
                main: {
                    temp: 11.41,
                    feels_like: 8.35,
                    temp_min: 11.41,
                    temp_max: 11.41,
                    pressure: 1027,
                    sea_level: 1027,
                    grnd_level: 1009,
                    humidity: 74,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 500,
                        main: "Rain",
                        description: "light rain",
                        icon: "10n",
                    },
                ],
                clouds: { all: 99 },
                wind: { speed: 3.36, deg: 347 },
                rain: { "3h": 0.75 },
                sys: { pod: "n" },
                dt_txt: "2020-01-09 18:00:00",
            },
            {
                dt: 1578603600,
                main: {
                    temp: 9.39,
                    feels_like: 6.68,
                    temp_min: 9.39,
                    temp_max: 9.39,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1010,
                    humidity: 74,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 7 },
                wind: { speed: 2.26, deg: 351 },
                sys: { pod: "n" },
                dt_txt: "2020-01-09 21:00:00",
            },
            {
                dt: 1578614400,
                main: {
                    temp: 8.09,
                    feels_like: 5.65,
                    temp_min: 8.09,
                    temp_max: 8.09,
                    pressure: 1030,
                    sea_level: 1030,
                    grnd_level: 1010,
                    humidity: 76,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 3 },
                wind: { speed: 1.64, deg: 26 },
                sys: { pod: "n" },
                dt_txt: "2020-01-10 00:00:00",
            },
            {
                dt: 1578625200,
                main: {
                    temp: 6.96,
                    feels_like: 4.39,
                    temp_min: 6.96,
                    temp_max: 6.96,
                    pressure: 1031,
                    sea_level: 1031,
                    grnd_level: 1011,
                    humidity: 78,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.63, deg: 37 },
                sys: { pod: "n" },
                dt_txt: "2020-01-10 03:00:00",
            },
            {
                dt: 1578636000,
                main: {
                    temp: 5.81,
                    feels_like: 2.9,
                    temp_min: 5.81,
                    temp_max: 5.81,
                    pressure: 1031,
                    sea_level: 1031,
                    grnd_level: 1011,
                    humidity: 79,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01n",
                    },
                ],
                clouds: { all: 0 },
                wind: { speed: 1.87, deg: 31 },
                sys: { pod: "n" },
                dt_txt: "2020-01-10 06:00:00",
            },
            {
                dt: 1578646800,
                main: {
                    temp: 5.69,
                    feels_like: 2.69,
                    temp_min: 5.69,
                    temp_max: 5.69,
                    pressure: 1032,
                    sea_level: 1032,
                    grnd_level: 1012,
                    humidity: 78,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 3 },
                wind: { speed: 1.93, deg: 40 },
                sys: { pod: "d" },
                dt_txt: "2020-01-10 09:00:00",
            },
            {
                dt: 1578657600,
                main: {
                    temp: 9.62,
                    feels_like: 5.88,
                    temp_min: 9.62,
                    temp_max: 9.62,
                    pressure: 1032,
                    sea_level: 1032,
                    grnd_level: 1012,
                    humidity: 55,
                    temp_kf: 0,
                },
                weather: [
                    {
                        id: 800,
                        main: "Clear",
                        description: "clear sky",
                        icon: "01d",
                    },
                ],
                clouds: { all: 2 },
                wind: { speed: 2.73, deg: 30 },
                sys: { pod: "d" },
                dt_txt: "2020-01-10 12:00:00",
            },
        ],
        city: {
            id: 2735943,
            name: "Porto",
            coord: { lat: 41.1495, lon: -8.6108 },
            country: "PT",
            population: 249633,
            timezone: 0,
            sunrise: 1578211193,
            sunset: 1578244732,
        },
    };
}