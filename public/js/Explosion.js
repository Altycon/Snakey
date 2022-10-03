"use strict";

import { TWO_PI, random } from "./utilities.js";

export class Explosion{
    constructor(x,y){
        this.position = {x: x, y: y};
        this.radius = 10;
        this.color = 'blue';
        this.opacity = 1;
        this.finished = false;
        this.parts = [];
        for(let i = 0; i < 100; i++){
            this.parts[i] = this.createPart();
        }
    }
    createPart(){
        
        const px = this.position.x;
        const py = this.position.y;
        const vx = random(-1,1);
        const vy = random(-1,1);

        return {
            radius: random(1,20),
            position: {x: px, y: py},
            velocity: {x: vx, y: vy},
            opacity: 1,
            opacity_rate: random(0.02,0.01),
            color_lightness: random(30,70,true)
        }
    }
    explode(){
        if(this.finished) return;

        for(let i = this.parts.length - 1; i >= 0; i--){
            const part = this.parts[i];
            if(part.opacity <= 0){
                this.parts.splice(i,1);
            }
            part.position.x += part.velocity.x;
            part.position.y += part.velocity.y;
            part.opacity -= part.opacity_rate;
        }
        if(this.parts.length === 0){
            this.finished = true;
            //console.log('Explosion finished')
        }
    }
    render(ctx){
        if(this.finished) return;

        ctx.lineWidth = 1;
        for(let i = this.parts.length - 1; i >= 0; i--){
            const part = this.parts[i];
            ctx.fillStyle = `hsl(30 100% ${part.color_lightness}% / ${part.opacity})`
            //ctx.strokeStyle = 'limegreen';
            ctx.beginPath();
            ctx.arc(part.position.x, part.position.y, part.radius, 0, TWO_PI);
            ctx.fill();
            //ctx.stroke();

            // connecting to center with lines
            // ctx.strokeStyle = 'yellow';
            // ctx.beginPath();
            // ctx.moveTo(this.position.x, this.position.y);
            // ctx.lineTo(part.position.x, part.position.y);
            // ctx.stroke();
        }
        //render center
        // ctx.fillStyle = 'pink';
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, 10, 0, TWO_PI);
        // ctx.fill();
    }
}