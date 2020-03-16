import React from "react";
import styled from "styled-components";

const Span = styled.div`
    margin: 10px;
    font-size: 18px;
    font-weight: bold;
    color: darkred;
`;

interface MessageProps {
    text: React.ReactNode | string;
}

export default function Message({ text }: MessageProps) {
    if (!text) {
        text = <br />;
    }

    return <Span className="message">{text}</Span>;
}
