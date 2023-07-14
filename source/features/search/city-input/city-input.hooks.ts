import { useEffect, useRef } from "react";
import { gainFocus } from "../../../core/utilities";

export function useFocusOnKeyPress() {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const keyPressListener = () => {
            gainFocus(ref.current);
        };

        // focus the html element whenever a key is pressed
        window.addEventListener("keypress", keyPressListener);

        return () => {
            window.removeEventListener("keypress", keyPressListener);
        };
    }, []);

    return ref;
}
