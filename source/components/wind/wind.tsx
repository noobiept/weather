import React, { useEffect, useRef } from "react";

import { toRadians } from "@drk4/utilities";
import { Value } from "../../shared/styles";
import { WindProps } from "./wind.types";
import { DegreeCanvas } from "./wind.styles";

function updateCanvas(
    canvas: HTMLCanvasElement | null,
    { canvasWidth, canvasHeight, degree }: WindProps
) {
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d")!;

    // clear the previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const halfWidth = canvasWidth / 2;
    const halfHeight = canvasHeight / 2;

    ctx.translate(halfWidth, halfHeight);
    ctx.rotate(toRadians(degree));

    ctx.moveTo(-halfWidth, -halfHeight);
    ctx.lineTo(halfWidth, 0);
    ctx.lineTo(-halfWidth, halfHeight);
    ctx.lineTo(0, 0);
    ctx.fill();
}

export default function Wind(props: WindProps) {
    const { canvasWidth, canvasHeight, degree, speed } = props;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        updateCanvas(canvasRef.current, props);
    }, [canvasWidth, canvasHeight, degree]);

    return (
        <div className="wind">
            <span>Wind Speed: </span>
            <Value className="value">{speed}</Value>
            <span> meter/sec</span>
            <DegreeCanvas
                width={canvasWidth}
                height={canvasHeight}
                ref={canvasRef}
                className="degreeCanvas"
                title={degree + "°"}
            />
        </div>
    );
}
