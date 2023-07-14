import { useEffect, useRef } from "react";

import { useWindowWidth } from "../../../core/hooks";
import { Canvas } from "./chart.styles";
import { ChartProps } from "./chart.types";

/**
 * Try to determine the best side to draw the text, to try to avoid as much as possible to draw text on top of the chart lines.
 */
function determineTextSide(value: number, left?: number, right?: number) {
    let textAlign: CanvasTextAlign;
    let textBaseline: CanvasTextBaseline;
    const leftValue = left ? left : value;
    const rightValue = right ? right : value;

    const leftDiff = leftValue - value;
    const rightDiff = rightValue - value;

    if (leftDiff > 0 && rightDiff > 0) {
        textBaseline = "top";
    } else {
        textBaseline = "bottom";
    }

    if (leftDiff > rightDiff) {
        textAlign = "left";
    } else {
        textAlign = "right";
    }

    return {
        textAlign: textAlign,
        textBaseline: textBaseline,
    };
}

function updateCanvas(
    canvas: HTMLCanvasElement | null,
    width: number,
    height: number,
    { data, title, unit, xAxis }: ChartProps
) {
    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d")!;
    const margin = 70;
    const xAxisMargin = 20;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const horizontalGap = (width - 2 * margin) / (data.length - 1);
    const verticalGap = (height - 2 * margin) / (max - min);
    let previousX;
    let previousY;

    // clear the previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw title
    ctx.save();
    ctx.font = "20px arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.fillText(title, width / 2, 0);
    ctx.restore();

    // draw x-axis
    ctx.beginPath();
    ctx.moveTo(margin, height - xAxisMargin);
    ctx.lineTo(width - margin, height - xAxisMargin);
    ctx.stroke();

    // draw chart lines
    for (let a = 0; a < data.length; a++) {
        const value = data[a];
        const x = margin + a * horizontalGap;
        const y = height - margin - (value - min) * verticalGap;

        // draw the line from the previous position to the current
        if (previousX) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.moveTo(previousX, previousY as number);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.restore();
        }

        previousX = x;
        previousY = y;

        // chart point
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();

        // show the weekday at midnight
        const date = xAxis[a];
        const hours = date.getHours();

        if (hours === 0) {
            const weekday = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            ctx.textBaseline = "bottom";
            ctx.textAlign = "left";
            ctx.fillStyle = "black";
            ctx.fillText(weekday[date.getDay()], x, height - xAxisMargin);
        }

        // draw dashed line from x-axis point to the value point
        ctx.save();
        ctx.beginPath();

        if (hours !== 0) {
            ctx.setLineDash([5, 10]);
        }

        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.moveTo(x, height - xAxisMargin);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();

        // only draw the value and x-axis point every 2 points (so it doesn't become unreadable)
        if (a % 2 === 0) {
            // value text
            const textPositioning = determineTextSide(
                value,
                data[a - 1],
                data[a + 1]
            );

            ctx.beginPath();
            ctx.font = "bold 14px arial";
            ctx.textBaseline = textPositioning.textBaseline;
            ctx.textAlign = textPositioning.textAlign;
            ctx.fillStyle = "blue";
            ctx.fillText(`${value} ${unit}`, x, y);

            // x-axis point
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const hourMinute = `${date.getHours()}:${minutes}`;

            ctx.beginPath();
            ctx.textBaseline = "top";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillText(hourMinute, x, height - xAxisMargin);
        }
    }
}

export function Chart(props: ChartProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const width = useWindowWidth();
    const height = 400;
    const { data, title, unit, xAxis } = props;

    useEffect(() => {
        updateCanvas(canvasRef.current, width, height, props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, data, title, unit, xAxis]);

    return (
        <Canvas
            className="chartCanvas"
            ref={canvasRef}
            width={width}
            height={height}
        />
    );
}
