import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Wind from "./wind";

describe("Wind", () => {
    test("That it has the right elements.", async () => {
        const props = {
            speed: 10,
            degree: 90,
            canvasWidth: 30,
            canvasHeight: 40,
        };
        const { container } = render(<Wind {...props} />);

        const element = container.querySelector("div")!;
        const value = element.querySelector(".value");
        const canvas = element.querySelector(
            ".degreeCanvas"
        ) as HTMLCanvasElement;

        expect(element).toHaveTextContent("Wind Speed:");
        expect(value).toHaveTextContent(props.speed.toString());
        expect(element).toHaveTextContent("meter/sec");
        expect(canvas).toBeInTheDocument();
        expect(canvas.width).toBe(props.canvasWidth);
        expect(canvas.height).toBe(props.canvasHeight);
    });
});
