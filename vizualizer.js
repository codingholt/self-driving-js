class Visualizer{
    static drawNetwork(ctx, network){
        const margin =50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin *2;
        const height = ctx.canvas.width - margin *2;


        const levelHeight = height /network.levels.length;
        
        for(let i = 0; i< network.levels.length; i++){
            const levelTop = top+ lerp(
                    height-levelHeight,
                    0,
                    network.levels.length == 1 
                    ? 0.5 
                    : i/(network.levels.length-1)
            )

            Visualizer.drawLevel(ctx, network.levels[i], 
                    left, levelTop,
                    width, levelHeight
                );
        }
    }

    static drawLevel(ctx, level, left, top, width, height){
        const right = left + width;
        const bottom = top + height;

        const {inputs, outputs, weights, biases} = level;
        for(let i =0; i<inputs.length;i++){
            for(let j =0; j<outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodeX(inputs, i, left, right),
                    bottom
                    )
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs,j, left, right),
                    top
                )
                ctx.lineWidth=2;
                ctx.strokeStyle = getRGBA(weights[i][j]);
                ctx.stroke();
            }
        }

        const nodeRadius = 18;
        for(let i = 0;  i< inputs.length; i++){
            const x  = Visualizer.#getNodeX(inputs, i, left, right)
            ctx.beginPath();
            ctx.arc(x, bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = 'black';
            ctx.fill()

            ctx.beginPath();
            ctx.arc(x, bottom,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle = getRGBA(inputs[i]);
            ctx.fill()
        }
    


        for(let i = 0;  i< outputs.length; i++){
            const x  = Visualizer.#getNodeX(outputs, i, left, right)
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = 'black';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x,top,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle = getRGBA(outputs[i]);
            ctx.fill();

            ctx.beginPath()
            ctx.lineWidth = 2;
            ctx.arc(x, top, nodeRadius *0.8, 0, Math.PI*2);
            ctx.strokeStyle = getRGBA(biases[i]);
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.stroke()
        }

     


    }
    static #getNodeX(nodes, index, left, right){
        return lerp(
            left, right, nodes.length == 1 ? 0.5 : index/(nodes.length-1)
        )
    }
}