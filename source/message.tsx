import * as React from "react";


interface MessageProps {
    text?: React.ReactElement <HTMLSpanElement> | string;
}

interface MessageState {

}


class Message extends React.Component <MessageProps, MessageState> {

    constructor() {
        super();
    }


    render() {
        return (
            <span className="message">{ this.props.text }</span>
        );
    }
}

export default Message;