import { MessageProps } from "./message.types";
import { Span } from "./message.styles";

export function Message({ text }: MessageProps) {
    if (!text) {
        text = <br />;
    }

    return <Span className="message">{text}</Span>;
}
