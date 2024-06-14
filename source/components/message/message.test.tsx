import { render } from "@testing-library/react";

import { Message } from "./message";

describe("Message", () => {
    test("Should show the right message.", () => {
        const content = "test";
        const { container } = render(<Message text={content} />);

        const element = container.querySelector(".message");
        expect(element).toHaveTextContent(content);
    });

    test("Should accept react nodes as well.", () => {
        const content = <div>test</div>;
        const { container } = render(<Message text={content} />);

        const element = container.querySelector(".message");
        expect(element).toContainHTML("<div>test</div>");
    });
});
