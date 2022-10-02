"use strict";

import { random, TWO_PI } from "./utilities.js";

export class SnakeFood{
    constructor(x,y,size){
        this.position = {x: x, y: y};
        this.size = size || random(5,8);
        this.color = `hsl(${random(0,360,true)} 100% 50%)`;
    }
    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
        ctx.fill();
    }
}