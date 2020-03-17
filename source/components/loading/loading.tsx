import React from "react";

import { ClipLoader } from "react-spinners";
import { Container } from "./loading.styles";
import { LoadingProps } from "./loading.types";

export default function Loading({ active }: LoadingProps) {
    return (
        <Container className="loading">
            <ClipLoader size={20} color={"#123abc"} loading={active} />
        </Container>
    );
}
