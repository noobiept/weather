import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toRadians } from "@drk4/utilities";
import { Value } from "../shared/styles";

const DegreeCanvas = styled.canvas`
    vertical-align: middle;
    margin: 1px 5px;
`;

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
