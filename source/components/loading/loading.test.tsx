import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Loading from "./loading";

describe("Loading", () => {
    test("Make sure it has all the elements.", () => {
        const active = true;
        const { container } = render(<Loading active={active} />);

        const loading = container.querySelector(".loading")!;
        expect(loading).toBeInTheDocument();

        // should have the loading animation within
        expect(loading.childElementCount).not.toBe(0);
    });

    test("Shouldn't have the animation when its not active.", () => {
        const active = false;
        const { container } = render(<Loading active={active} />);

        const loading = container.querySelector(".loading")!;
        expect(loading).toBeInTheDocument();
        expect(loading.childElementCount).toBe(0);
    });
});
