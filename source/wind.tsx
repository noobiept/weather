import * as React from "react";


interface WindProps {
    speed: number;
    degree: number;
    canvasWidth: number;
    canvasHeight: number;
}

interface WindState {

}


class Wind extends React.Component <WindProps, WindState> {

    componentDidMount() {
        this.updateCanvas();
    }


    componentDidUpdate() {
        this.updateCanvas();
    }


    updateCanvas() {
        var canvas = this.refs.degreeCanvas as HTMLCanvasElement;
        var ctx = canvas.getContext( '2d' )!;

        var halfWidth = this.props.canvasWidth / 2;
        var halfHeight = this.props.canvasHeight / 2;

        ctx.translate( halfWidth, halfHeight );
        ctx.rotate( this.props.degree * Math.PI / 180 );

        ctx.moveTo( -halfWidth, -halfHeight );
        ctx.lineTo( halfWidth, 0 );
        ctx.lineTo( -halfWidth, halfHeight );
        ctx.lineTo( 0, 0 );
        ctx.fill();
    }


    render() {
        return (
            <div>Wind Speed: { this.props.speed } meter/sec
                <canvas
                    width= { this.props.canvasWidth }
                    height= { this.props.canvasHeight }
                    ref="degreeCanvas"
                    className="degreeCanvas"
                    title= { this.props.degree + '°' }>
                </canvas>
            </div>
        )
    }
}

export default Wind;