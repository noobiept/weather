import * as React from "react";


interface MessageProps {
    text?: string;
}

interface MessageState {

}


class Message extends React.Component <MessageProps, MessageState> {

    constructor() {
        super();
    }


    render() {
        return (
            <div>{ this.props.text }</div>
        );
    }
}

export default Message