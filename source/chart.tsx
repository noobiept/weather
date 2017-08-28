import * as React from "react";


interface ChartProps {
    width: number;
    height: number;
    data: number[];
    unit: string;
    title: string;
    xAxis: string[];
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

        var margin = 20;
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
        ctx.moveTo( margin, height - margin );
        ctx.lineTo( width - margin, height - margin );
        ctx.stroke();

            // draw chart lines
        for (var a = 0 ; a < data.length ; a++) {
            let value = data[ a ];
            let x = margin + a * horizontalGap;
            let y = height - margin - (value - min) * verticalGap;

            if ( previousX ) {
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.moveTo( previousX, previousY as number );
                ctx.lineTo( x, y );
                ctx.stroke();
            }

            previousX = x;
            previousY = y;

                // chart point
            ctx.beginPath();
            ctx.arc( x, y, 2, 0, 2 * Math.PI );
            ctx.fillStyle = 'green';
            ctx.fill();

                // value text
            ctx.beginPath();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = 'blue';
            ctx.fillText( `${ value } ${ unit }`, x, y );

                // x-axis point (not on every point)
            if ( a % 2 === 0 ) {
                ctx.beginPath();
                ctx.fillText( this.props.xAxis[ a ], x, height - margin );
            }

        }
    }


    render() {
        return (
            <canvas ref="canvasElement" width= { this.props.width } height= { this.props.height }></canvas>
        );
    }
}

export default Chart;