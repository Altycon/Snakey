"use strict";

//import { userIsOnMobileDevice } from "./js/DeviceCheck.js";
import { fixCanvas } from "./js/utilities.js";
import { detectSwipe } from "./js/SwipeDetection.js";
import { SnakeGame } from "./js/SnakeGame.js";

// if(userIsOnMobileDevice) {
//     alert("You're on mobile!")
// } else {
//     alert("You're on desktop!");
// }


const DPI = devicePixelRatio;
let sg_canvas,sg_ctx;

let GAME;
let snake_game_interval;

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
    sg_canvas = document.getElementById('GameDisplay');
    fixCanvas(sg_canvas, DPI);
    
    sg_ctx = sg_canvas.getContext('2d');

    GAME = new SnakeGame(sg_ctx);
    console.log(GAME);

    //window.addEventListener('keydown', moveSnake); 
    detectSwipe('GameDisplay', moveSnackMobile)
    
    animate();
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
            GAME.stopSnake();
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

