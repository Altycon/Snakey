"use strict";

import { userIsOnMobileDevice } from "./js/DeviceCheck.js";
import { fixCanvas, DPI } from "./js/utilities.js";
import { detectSwipe } from "./js/SwipeDetection.js";
import { SnakeGame } from "./js/SnakeGame.js";




let sg_canvas,sg_ctx;

let GAME;
let snake_game_interval;

const removeModal = (ev)=>{
    document.querySelector('.game-modal').classList.add('hide');
    animate();
}

const moveSnackMobile = (element,direction)=>{
    switch(direction){
        case 'up':
            GAME.changeDirection({x: 0, y:-1});
            break;
        case 'right':
            GAME.changeDirection({x: 1, y: 0});
            break;
        case 'down':
            GAME.changeDirection({x: 0, y: 1});
            break;
        case 'left':
            GAME.changeDirection({x: -1, y: 0});
            break;
    }
}

const Start = ()=>{
    document.querySelector('.js-begin-game-btn').addEventListener('click',removeModal)
    sg_canvas = document.getElementById('GameDisplay');
    fixCanvas(sg_canvas, DPI);
    
    sg_ctx = sg_canvas.getContext('2d');

    GAME = new SnakeGame(sg_ctx);
    console.log(GAME);

    if(userIsOnMobileDevice){
        detectSwipe('GameDisplay', moveSnackMobile)
    }else{
        window.addEventListener('keydown', moveSnake); 
    }
    
    
    
    // animate();
}
function moveSnake(ev){
    ev.preventDefault();
    const key = ev.key;
    switch(key){
        case 'ArrowUp':
            GAME.changeDirection({x: 0, y:-1});
            break;
        case 'ArrowRight':
            GAME.changeDirection({x: 1, y: 0});
            break;
        case 'ArrowDown':
            GAME.changeDirection({x: 0, y: 1});
            break;
        case 'ArrowLeft':
            GAME.changeDirection({x: -1, y: 0});
            break;
        case 's':
            //GAME.stopSnake();
            cancelAnimationFrame(snake_game_interval)
            break;
        case 'g':
            snake_game_interval = requestAnimationFrame(animate)
            break;
        case 't':
            console.log(GAME.snake.tail);
            break;
        case 'i':
            GAME.snake.speed++;
            break;
        case 'd':
            GAME.snake.speed--;
    }
}
function animate(){

    GAME.update();
    GAME.render();

    snake_game_interval = requestAnimationFrame(animate)
}

document.addEventListener('DOMContentLoaded',Start);

