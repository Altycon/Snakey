"use strict";
export const DPI = devicePixelRatio;
export const TWO_PI = Math.PI*2;
export const random = (min,max,bool)=> bool ? Math.floor(Math.random()*(max-min)+min): Math.random()*(max-min)+min;
export const scale = (number, inMin, inMax, outMin, outMax)=>{
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export const fixCanvas = (canvas,dpi)=>{
    const style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
    const style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
    canvas.setAttribute('width',style_width*dpi);
    canvas.setAttribute('height',style_height*dpi);
}