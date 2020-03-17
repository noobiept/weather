import styled, { css } from "styled-components";

export const ListItem = styled.li<{ selected?: boolean }>`
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

export const Value = styled.span`
    color: blue;
`;

export const HorizontalList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
`;
