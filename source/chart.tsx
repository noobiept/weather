import * as React from "react";
import { padStart } from "./utilities";


interface ChartProps {
    width: number;
    height: number;
    data: number[];
    unit: string;
    title: string;
    xAxis: Date[];
}

interface ChartState {

}


class Chart extends React.Component <ChartProps, ChartState> {

    componentDidMount() {
        this.updateCanvas();
    }


    componentDidUpdate() {
        this.updateCanvas();
    }


    updateCanvas() {
        var canvas = this.refs.canvasElement as HTMLCanvasElement;
        var ctx = canvas.getContext( '2d' )!;

        var margin = 35;
        var xAxisMargin = 20;
        var width = this.props.width;
        var height = this.props.height;
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
                ctx.beginPath();
                ctx.font = 'bold 14px arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = 'blue';
                ctx.fillText( `${ value } ${ unit }`, x, y );

                    // x-axis point
                let date = this.props.xAxis[ a ];
                let hours = date.getHours();
                let minutes = padStart( date.getMinutes().toString(), 2, "0" );
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
            <canvas className="chartCanvas" ref="canvasElement" width= { this.props.width } height= { this.props.height }></canvas>
        );
    }
}

export default Chart;