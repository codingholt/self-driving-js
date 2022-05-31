class Visualizer{
    static drawNetwork(ctx, network){
        const margin =50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin *2;
        const height = ctx.canvas.width - margin *2;

        Visualizer.drawLevel(
            ctx, network.levels[0], 
            left,top,
            width,height
            );
    }

    static drawLevel(ctx, level, left, top, width, height){
        const right = left + width;
        const bottom = top + height;
        console.log(level)
        const {inputs, outputs, weights} = level;
        const nodeRadius = 18;
        for(let i =0; i<inputs.length;i++){
            for(let j =0; j<outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                        Visualizer.#getNodeX(inputs, i, left, right), bottom
                    )
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs,j, left, right), top
                )
                ctx.lineWidth=2;

                const value =  weights[i][j];
                const alpha = Math.abs(value);
                const R = value<0 ? 0: 255;
                const G = R;
                const B = value>0?0:255;
                ctx.strokeStyle = "rgba("+R+","+G+","+B+","+alpha+")";
                ctx.stroke();
            }
        }
        for(let i = 0;  i< level.inputs.length; i++){
            const x  = Visualizer.#getNodeX(inputs, i, left, right)
            ctx.beginPath();
            ctx.arc(x, bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = 'white';
            ctx.fill()
        }
    


        for(let i = 0;  i< outputs.length; i++){
            const x  = Visualizer.#getNodeX(outputs, i, left, right)
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = 'white';
            ctx.fill()
        }

     


    }
    static #getNodeX(nodes, index, left, right){
        return lerp(
            left, right, nodes.length == 1 ? 0.5 : index/(nodes.length-1)
        )
    }
}