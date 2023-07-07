import styled, { css } from "styled-components";

export const ItemRoot = styled.li<{ selected?: boolean }>`
    cursor: pointer;
    color: blue;
    margin: 4px;
    padding: 4px;
    font-weight: bold;

    &:hover {
        transform: scale(1.1);
    }

    ${({ selected }) =>
        selected &&
        css`
            background-color: rgba(70, 50, 150, 0.1);
        `}
`;
