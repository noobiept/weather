import styled, { createGlobalStyle } from "styled-components";
import Loading from "../loading/loading";

export const GlobalStyle = createGlobalStyle`
    body {
        text-align: center;
        margin: 10px 0;
        padding: 0;
    }
`;

export const List = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const WeatherInfoContainer = styled.div`
    & > div {
        margin: 10px 0;
    }
`;

export const InitialLoading = styled(Loading)`
    position: fixed;
    top: 0;
    right: 0;
`;
