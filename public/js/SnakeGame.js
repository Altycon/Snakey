"use strict";

import { userIsOnMobileDevice } from "./DeviceCheck.js";
import { random } from "./utilities.js";
import { SnakeFood } from "./SnakeFood.js";
import { Snake } from "./Snake.js";

let S_size,
    F_size;

if(userIsOnMobileDevice){
    S_size = 50;
    F_size = S_size*0.5;
}else{
    S_size = 10;
    F_size = S_size*0.5;
}
export class SnakeGame{
    constructor(context){
        this.name = 'Snake Game';
        this.context = context; 
        this.width = this.context.canvas.width || 300;
        this.height = this.context.canvas.height || 150;
        this.snake_size = S_size;
        this.snake = new Snake(
            100, //random(-this.snake_size,this.width-this.snake_size),
            100, //random(-this.snake_size,this.height-this.snake_size),
            this.snake_size,this.snake_size,'limegreen');
        this.food = [];
        this.food_count = 10;
        this.addFood(this.food_count);
    }
    addFood(n){
        for(let i = 0; i < n; i++){
            this.food[i] = new SnakeFood(
                random(-this.snake_size,this.width-this.snake_size),
                random(-this.snake_size,this.height-this.snake_size),
                F_size);
        }
    }
    findFood(){
        const len = this.food.length -1;
        for(let i = len; i >= 0; i--){
            const dx = this.food[i].position.x - (this.snake.position.x + (this.snake.width*0.5));
            const dy = this.food[i].position.y - (this.snake.position.y + (this.snake.height*0.5));
            const distance = Math.hypot(dx,dy);
            if(distance < this.food[i].size + (this.snake.width*0.5)){
                this.snake.segments++;
                this.food.splice(i,1);
                this.addFood(this.food_count);
                // console.log('EATEN', 1 + `of ${this.food.length}`);
                // console.log('Segmants', this.snake.segments)
                // console.log('Path length', this.snake.path.length)
                // console.log('Tail length', this.snake.tail.length + 1)
                // console.log('Tail array before new is added', this.snake.tail)
            }
        }
    }
    changeDirection(v){
        this.snake.velocity = v;
    }
    stopSnake(){
        this.snake.velocity = {x: 0, y: 0};
    }
    update(){
        this.findFood();
        this.snake.move(this.width,this.height)
    }
    render(){
        this.context.clearRect(0,0,this.width,this.height);

        for(let i = this.food.length - 1; i >= 0; i--){
            this.food[i].render(this.context);
        }
        this.snake.render(this.context);
    }
}