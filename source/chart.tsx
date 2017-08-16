import * as React from "react";


interface ChartProps {
    width: number;
    height: number;
    data: number[];
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

        var min = Math.min( ...data );
        var max = Math.max( ...data );

        var horizontalGap = width / (data.length + 1);
        var verticalGap = height / (max - min + 1);

        for (var a = 0 ; a < data.length ; a++) {
            let x = horizontalGap + a * horizontalGap;
            let y = height - verticalGap / 2 - (data[ a ] - min) * verticalGap;

            ctx.beginPath();
            ctx.arc( x, y, 2, 0, 2 * Math.PI );
            ctx.fillStyle = 'green';
            ctx.fill();
        }
    }


    render() {
        return (
            <canvas ref="canvasElement" width= { this.props.width } height= {this.props.height }></canvas>
        );
    }
}

export default Chart;