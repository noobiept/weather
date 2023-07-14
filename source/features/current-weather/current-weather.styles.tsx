import styled from "@emotion/styled";
import { WeatherCondition } from "../../components/weather-condition";

export const InfoList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: left;
    margin: 10px;

    & > div {
        margin: 10px;
    }
`;

export const StyledWeatherCondition = styled(WeatherCondition)`
    font-size: 150%;
`;
