"use strict";

import { userIsOnMobileDevice } from "./DeviceCheck.js";
import { random } from "./utilities.js";
import { SnakeFood } from "./SnakeFood.js";
import { Snake } from "./Snake.js";
import { Explosion } from "./Explosion.js";
import { Lightning } from "./Lightning.js";

let S_size,
    F_size;

if(userIsOnMobileDevice){
    S_size = 80;
    F_size = S_size*0.25;
}else{
    S_size = 40;
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
        this.explosions = [];
        this.lightning_strike = null;
        this.lightning_strike = new Lightning(this.width/2, 0, this.height);
        this.lightning_strike.strike();
    }
    addFood(n){
        const margin = 100; 
        for(let i = 0; i < n; i++){
            const x = random(-margin,this.width-margin);
            const y = random(-margin,this.height-margin);
            const dx = (this.snake.position.x + this.snake.width) - x;
            const dy = (this.snake.position.y + this.snake.height) - y;
            const distance = Math.hypot(dx,dy);
            if(distance < 100){
                i--;
                continue;
            } 
            this.food[i] = new SnakeFood(
                x,
                y,
                F_size);
        }
    }
    findFood(){
        let piece_of_food = 0;
        const len = this.food.length -1;
        for(let i = len; i >= 0; i--){
            const dx = this.food[i].position.x - (this.snake.position.x + (this.snake.width*0.5));
            const dy = this.food[i].position.y - (this.snake.position.y + (this.snake.height*0.5));
            const distance = Math.hypot(dx,dy);
            if(distance < this.food[i].size + (this.snake.width*0.5)){
                //this.snake.segments++;
                piece_of_food++;

                this.lightning_strike = new Lightning(this.food[i].position.x, 0, this.height);
                this.lightning_strike.strike();
                this.explosions.push(new Explosion(this.food[i].position.x, this.food[i].position.y));
                
                this.food.splice(i,1);
                this.food = [];
                this.addFood(this.food_count);

                
                // console.log('EATEN', 1 + `of ${this.food.length}`);
                // console.log('Segmants', this.snake.segments)
                // console.log('Path length', this.snake.path.length)
                // console.log('Tail length', this.snake.tail.length + 1)
                // console.log('Tail array before new is added', this.snake.tail)
            }
        }
        this.snake.segments += piece_of_food;
       
    }
    changeDirection(v){
        this.snake.velocity = v;
    }
    stopSnake(){
        this.snake.velocity = {x: 0, y: 0};
    }
    update(){
        this.findFood();

        if(this.explosions.length){
            for(let i = this.explosions.length - 1; i >= 0; i--){
                if(this.explosions[i].finished){
                    this.explosions.splice(i,1);
                }
            }
        }
        
        this.snake.move(this.width,this.height)
    }
    render(){
        //clear canvas
        this.context.clearRect(0,0,this.width,this.height);

        
        // food
        for(let i = this.food.length - 1; i >= 0; i--){
            this.food[i].render(this.context);
        }
        // snake
        this.snake.render(this.context);

        // explosions
        if(this.explosions.length){
            for(let i = this.explosions.length - 1; i >= 0; i--){
                this.explosions[i].explode();
                this.explosions[i].render(this.context);
            } 
        }
        if(this.lightning_strike != null){
            //this.lightning_strike.render(this.context);
            this.lightning_strike.animate(this.context);
        }
        
    }
}