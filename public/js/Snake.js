"use strict";

import { DPI, TWO_PI } from "./utilities.js";
import { userIsOnMobileDevice } from "./DeviceCheck.js";

let S_speed;
if(userIsOnMobileDevice){
    S_speed = 2 * DPI;
}else{
    S_speed = 4;
}
export class Snake{
    constructor(x,y,width,height,color){
        this.position = {x: x, y: y};
        this.width = width;
        this.height = height;
        this.color = color || 'red';
        this.tail_color = 'hsl(180 100% 50%)';
        this.speed = S_speed;
        this.velocity = {x: 0, y: 0};
        this.segments = 0;
        this.path = [];
        this.tail = [];
    }
    checkBoundary(w,h){
        if(this.position.x <= -this.width){
            this.position.x = this.position.x + w;
        }
        if(this.position.x - this.width >= w){
            this.position.x = -this.width;
        }
        if(this.position.y <= -this.height){
            this.position.y = this.position.y + h;
        }
        if(this.position.y - this.height >= h){
            this.position.y = -this.height;
        }
    }
    checkTailCollision(){
        if(this.tail.length > 2){
            const len = this.tail.length - 1;
            for(let i = len; i >= 0; i--){
                const segmant = this.tail[i];
                const dx = (segmant.x + (this.width*0.5)) - (this.position.x + (this.width*0.5));
                const dy = (segmant.y + (this.height*0.5)) - (this.position.y + (this.height*0.5));
                const distance = Math.hypot(dx,dy);
                if(Math.abs(distance) < this.width/2){
                    console.log('hit');
                    console.log(this.tail.length)
                    // this.segments = 0;
                    // this.path = [];
                    // this.tail = [];
                }
            }
        }
        
    }
    move(w,h){
        
        // capture position
        this.path.push({x: this.position.x, y: this.position.y});
        
        /** NOTE --- Something with the tail index still messes up everything once in awhile
         * and I don't know why...besides this weird implimentation.
         */
        // add tail segmants
        for(let i = 0; i < this.segments; i++){
            const index = Math.floor((this.width*i)/this.speed);
            this.tail[i] = this.path[index];
            this.tail[i].index = (this.width*i);
        }

        // limit path length
        const limit = Math.floor((this.width*this.segments)/this.speed) + 1;
        if(this.path.length > limit){
            this.path.shift();
        }
        
        // check boundary and place position on opposite side 
        this.checkBoundary(w,h);

        // update position
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;

        // checking tail segmant collision
        //this.checkTailCollision();

    }
    render(ctx){
        // display tail segmants
        const tail_length = this.tail.length - 1;
        

        for(let i = tail_length; i >= 0; i--){
            const segmant = this.tail[i];
            ctx.beginPath();
            ctx.fillStyle = this.tail_color;
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.rect(segmant.x, segmant.y, this.width, this.height);
            //ctx.arc(segmant.x, segmant.y, this.width/2, 0, TWO_PI);
            ctx.fill();
            ctx.stroke();


            // ctx.beginPath();
            // ctx.strokeStyle = 'yellow';
            // ctx.moveTo(this.position.x + (this.width*0.5), this.position.y + (this.height*0.5));
            // ctx.lineTo(segmant.x + (this.width*0.5), segmant.y + (this.height*0.5));
            // ctx.closePath();
            // ctx.stroke();
        }
        // display head segmant
        
        

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        
    }
}