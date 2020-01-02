import { useState, useEffect } from "react";

function getWindowWidth() {
    return document.body.clientWidth;
}

/**
 * Get the window's width value.
 */
export function useWindowWidth() {
    const [width, setWidth] = useState(getWindowWidth());

    useEffect(() => {
        const update = () => {
            setWidth(getWindowWidth());
        };
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("resize", update);
        };
    });

    return width;
}
