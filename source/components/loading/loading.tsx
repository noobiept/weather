import classNames from "classnames";

import { ClipLoader } from "react-spinners";
import { Container } from "./loading.styles";
import { LoadingProps } from "./loading.types";

export default function Loading({ active, className }: LoadingProps) {
    return (
        <Container className={classNames("loading", className)}>
            <ClipLoader size={20} color={"#123abc"} loading={active} />
        </Container>
    );
}
