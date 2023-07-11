import styled from "@emotion/styled";
import Loading from "../loading/loading";
import { css } from "@emotion/react";

export const globalStyle = css`
    body {
        text-align: center;
        margin: 10px 0;
        padding: 0;
    }
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
