import * as React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
    active: boolean;
}

interface LoadingState {}

export default class Loading extends React.Component<
    LoadingProps,
    LoadingState
> {
    render() {
        return (
            <div className="sweet-loading">
                <ClipLoader
                    sizeUnit={"px"}
                    size={20}
                    color={"#123abc"}
                    loading={this.props.active}
                />
            </div>
        );
    }
}
