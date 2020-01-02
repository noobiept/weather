import React, { useEffect, useRef } from "react";
import { toRadians } from "./utilities";

export interface WindProps {
    speed: number;
    degree: number;
    canvasWidth: number;
    canvasHeight: number;
}

export default function Wind({
    canvasWidth,
    canvasHeight,
    degree,
    speed,
}: WindProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function updateCanvas() {
        const canvas = canvasRef.current;
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

    useEffect(() => {
        updateCanvas();
    }, [canvasWidth, canvasHeight, degree]);

    return (
        <div>
            <span>Wind Speed: </span>
            <span className="value">{speed}</span>
            <span> meter/sec</span>
            <canvas
                width={canvasWidth}
                height={canvasHeight}
                ref={canvasRef}
                className="degreeCanvas"
                title={degree + "°"}
            />
        </div>
    );
}
