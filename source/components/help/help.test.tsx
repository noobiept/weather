import { render } from "@testing-library/react";

import { Help } from "./help";

describe("Help", () => {
    test("Should have some text.", () => {
        const { container } = render(<Help />);

        const help = container.querySelector("div");
        expect(help).not.toBeEmptyDOMElement();
    });
});
