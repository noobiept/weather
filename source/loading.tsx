import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
    active: boolean;
}

export default function Loading({ active }: LoadingProps) {
    return (
        <div className="loading">
            <ClipLoader size={20} color={"#123abc"} loading={active} />
        </div>
    );
}
