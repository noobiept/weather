import React from "react";

interface MessageProps {
    text?: React.ReactElement<HTMLSpanElement> | string;
}

export default function Message({ text }: MessageProps) {
    return <span className="message">{text}</span>;
}
