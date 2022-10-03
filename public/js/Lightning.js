"use strict";

import { random, TWO_PI } from "./utilities.js";

export class Lightning{
    constructor(x,y,height){
        this.start = {x: x, y: y};
        this.height = height;
        this.color = 'white';
        this.path = [];
        this.struck = false;
        this.interval = 1;
    }
    strike(){
        
        for(let i = 0; i <= this.height; i+= random(5,50)){
            const offsetX = random(-20,20,true);
            const x = this.start.x + offsetX;
            const y = this.start.y + i;
            this.path.push({x: x, y: y})
        }
        this.struck = true;
    }
    animate(ctx){
        if(this.struck){
            ctx.fillStyle = this.color;
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            const len = this.path.length;
            for(let i = 0; i < this.interval; i++){
                const position = this.path[i];
                ctx.lineTo(position.x, position.y);
                //ctx.arc(position.x, position.y, 2, 0, TWO_PI);
                //ctx.fill();
                
            }
            ctx.stroke();
            if(!(this.interval >= this.path.length)){
                this.interval++;
            }
        }
    }
    render(ctx){
        if(this.struck){
            ctx.fillStyle = this.color;
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            const len = this.path.length;
            for(let i = 0; i < len; i++){
                const position = this.path[i];
                ctx.lineTo(position.x, position.y);
                //ctx.arc(position.x, position.y, 2, 0, TWO_PI);
                //ctx.fill();
                
            }
            ctx.stroke();
        }
        
    }
}