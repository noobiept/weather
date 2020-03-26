import styled from "styled-components";

export const WeatherList = styled.div`
    display: flex;
    width: 95vw;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin: auto;
`;

export const DateDisplay = styled.div`
    font-weight: bold;
`;

export const ForecastItem = styled.div`
    &:nth-child(odd) {
        background-color: rgba(0, 0, 255, 0.1);
    }
`;
