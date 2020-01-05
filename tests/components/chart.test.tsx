import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Chart from "../../source/components/chart";

describe("Chart", () => {
    test("Should have the canvas element.", () => {
        const props = {
            data: [5, 10, 8, 5, 6],
            title: "Temperature",
            unit: "°C",
            xAxis: [new Date(), new Date(), new Date(), new Date(), new Date()],
        };
        const { container } = render(<Chart {...props} />);
        const canvas = container.querySelector(".chartCanvas");

        expect(canvas).toBeInTheDocument();
    });
});
