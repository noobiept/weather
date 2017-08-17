import * as React from "react";


interface ChartProps {
    width: number;
    height: number;
    data: number[];
    unit: string;
    title: string;
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

        var width = this.props.width;
        var height = this.props.height;
        var data = this.props.data;
        var unit = this.props.unit;

        var min = Math.min( ...data );
        var max = Math.max( ...data );

        var horizontalGap = width / (data.length + 1);
        var verticalGap = height / (max - min + 1);
        let previousX;
        let previousY;

        ctx.save();
        ctx.font = '20px arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black';
        ctx.fillText( this.props.title, width / 2, 0 );
        ctx.restore();

        for (var a = 0 ; a < data.length ; a++) {
            let value = data[ a ];
            let x = horizontalGap + a * horizontalGap;
            let y = height - verticalGap / 2 - (value - min) * verticalGap;

            if ( previousX ) {
                ctx.beginPath();
                ctx.strokeStyle = 'black';
                ctx.moveTo( previousX, previousY as number );
                ctx.lineTo( x, y );
                ctx.stroke();
            }

            previousX = x;
            previousY = y;

            ctx.beginPath();
            ctx.arc( x, y, 2, 0, 2 * Math.PI );
            ctx.fillStyle = 'green';
            ctx.fill();

            ctx.beginPath();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = 'blue';
            ctx.fillText( `${ value } ${ unit }`, x, y );
        }
    }


    render() {
        return (
            <canvas ref="canvasElement" width= { this.props.width } height= {this.props.height }></canvas>
        );
    }
}

export default Chart;