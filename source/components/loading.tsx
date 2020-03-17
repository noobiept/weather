import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const Container = styled.div`
    width: 25px;
    height: 25px;
    margin-left: 10px;
`;

interface LoadingProps {
    active: boolean;
}

export default function Loading({ active }: LoadingProps) {
    return (
        <Container className="loading">
            <ClipLoader size={20} color={"#123abc"} loading={active} />
        </Container>
    );
}
