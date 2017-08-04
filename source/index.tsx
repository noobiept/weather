import * as React from "react";
import * as ReactDOM from "react-dom";


interface TestProps {
    text: string;
}

interface TestState {
    value: boolean;
}

class Test extends React.Component<TestProps, TestState> {

    constructor() {
        super();
        this.state = {
            value: true
        };
    }

    render() {
        return (
            <div>
                <div>Text -- { this.props.text }</div>
                <div>Value -- { this.state.value.toString() }</div>
            </div>
        );
    }
}


ReactDOM.render(
    <Test text="The text." />,
    document.getElementById( "Root" )
);