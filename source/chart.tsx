import * as React from "react";


interface ChartProps {
    data: number[];
    unit: string;
    title: string;
    xAxis: Date[];
}

interface ChartState {
    width: number;
    height: number;
}


class Chart extends React.Component <ChartProps, ChartState> {

    constructor() {
        super();

        this.state = {
            width: 800,
            height: 400
        };
    }


    /**
     * Set the chart canvas with the same width as the window's width.
     */
    updateWidth() {
        let canvas = this.refs.canvasElement as HTMLCanvasElement;
        let parentWidth = document.body.clientWidth;

        this.setState({
            width: parentWidth
        });
    }


    componentDidMount() {
            // automatically resize the chart's width as the window's width change
        window.addEventListener( 'resize', () => {
            this.updateWidth();
        });
        this.updateWidth();
    }


    componentDidUpdate() {
        this.updateCanvas();
    }


    /**
     * Try to determine the best side to draw the text, to try to avoid as much as possible to draw text on top of the chart lines.
     */
    determineTextSide( value: number, left?: number, right?: number ) {

        let textAlign;
        let textBaseline;
        let leftValue = left ? left : value;
        let rightValue = right ? right : value;

        let leftDiff = leftValue - value;
        let rightDiff = rightValue - value;

        if ( leftDiff > 0 && rightDiff > 0 ) {
            textBaseline = 'top';
        }

        else {
            textBaseline = 'bottom';
        }

        if ( leftDiff > rightDiff ) {
            textAlign = 'left';
        }

        else {
            textAlign = 'right';
        }

        return {
            textAlign: textAlign,
            textBaseline: textBaseline
        };
    }


    updateCanvas() {
        var canvas = this.refs.canvasElement as HTMLCanvasElement;
        var ctx = canvas.getContext( '2d' )!;

        var margin = 70;
        var xAxisMargin = 20;
        var width = this.state.width;
        var height = this.state.height;
        var data = this.props.data;
        var unit = this.props.unit;

        var min = Math.min( ...data );
        var max = Math.max( ...data );

        var horizontalGap = (width - 2 * margin) / (data.length - 1);
        var verticalGap = (height - 2 * margin) / (max - min);
        let previousX;
        let previousY;

            // clear the previous drawing
        ctx.clearRect( 0, 0, canvas.width, canvas.height );

            // draw title
        ctx.save();
        ctx.font = '20px arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black';
        ctx.fillText( this.props.title, width / 2, 0 );
        ctx.restore();

            // draw x-axis
        ctx.beginPath();
        ctx.moveTo( margin, height - xAxisMargin );
        ctx.lineTo( width - margin, height - xAxisMargin );
        ctx.stroke();

            // draw chart lines
        for (var a = 0 ; a < data.length ; a++) {
            let value = data[ a ];
            let x = margin + a * horizontalGap;
            let y = height - margin - (value - min) * verticalGap;

            if ( previousX ) {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.moveTo( previousX, previousY as number );
                ctx.lineTo( x, y );
                ctx.stroke();
                ctx.restore();
            }

            previousX = x;
            previousY = y;

                // chart point
            ctx.beginPath();
            ctx.arc( x, y, 2, 0, 2 * Math.PI );
            ctx.fillStyle = 'blue';
            ctx.fill();

                // only draw the value and x-axis point every 2 points (so it doesn't become unreadable)
            if ( a % 2 === 0 ) {

                    // value text
                let textPositioning = this.determineTextSide(
                    value,
                    data[ a - 1 ],
                    data[ a + 1 ],
                );

                ctx.beginPath();
                ctx.font = 'bold 14px arial';
                ctx.textBaseline = textPositioning.textBaseline;
                ctx.textAlign = textPositioning.textAlign;
                ctx.fillStyle = 'blue';
                ctx.fillText( `${ value } ${ unit }`, x, y );

                    // x-axis point
                let date = this.props.xAxis[ a ];
                let hours = date.getHours();
                let minutes = date.getMinutes().toString().padStart( 2, "0" );
                let hourMinute = `${ date.getHours() }:${ minutes }`;

                ctx.beginPath();
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'black';
                ctx.fillText( hourMinute, x, height - xAxisMargin );

                    // show the weekday at midnight
                if ( hours === 0 ) {
                    let weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
                    ctx.textBaseline = 'bottom';
                    ctx.fillText( weekday[ date.getDay() ], x, height - xAxisMargin );
                }

                    // draw dashed line from x-axis point to the value point
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash( [5, 10] );
                ctx.moveTo( x, height - xAxisMargin );
                ctx.lineTo( x, y );
                ctx.stroke();
                ctx.restore();
            }
        }
    }


    render() {
        return (
            <canvas className="chartCanvas" ref="canvasElement" width= { this.state.width } height= { this.state.height }></canvas>
        );
    }
}

export default Chart;