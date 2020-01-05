import React from "react";

interface MessageProps {
    text: React.ReactNode | string;
}

export default function Message({ text }: MessageProps) {
    return <span className="message">{text}</span>;
}
