import * as React from "react";
import { toRadians } from "./utilities";


interface WindProps {
    speed: number;
    degree: number;
    canvasWidth: number;
    canvasHeight: number;
}

interface WindState {

}


export default class Wind extends React.Component <WindProps, WindState> {

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
        ctx.rotate( toRadians( this.props.degree ) );

        ctx.moveTo( -halfWidth, -halfHeight );
        ctx.lineTo( halfWidth, 0 );
        ctx.lineTo( -halfWidth, halfHeight );
        ctx.lineTo( 0, 0 );
        ctx.fill();
    }


    render() {
        return (
            <div>Wind Speed: <span className="value">{ this.props.speed }</span> meter/sec
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
