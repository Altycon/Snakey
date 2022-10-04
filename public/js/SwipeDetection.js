"use strict";

import { DPI } from "./utilities.js";

export function detectSwipe(id, f) {
    
    let detect = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        minX: 30 * DPI,   // min X swipe for horizontal swipe
        maxX: 30 * DPI,   // max X difference for vertical swipe
        minY: 30 * DPI,   // min Y swipe for vertial swipe
        maxY: 60 *DPI  // max Y difference for horizontal swipe
    },
        direction = null,
        element = document.getElementById(id);

    element.addEventListener('touchstart', function (event) {
        const touch = event.touches[0];
        detect.startX = touch.screenX;
        detect.startY = touch.screenY;
        
    });

    element.addEventListener('touchmove', function (event) {
        event.preventDefault();
        const touch = event.touches[0];
        detect.endX = touch.screenX;
        detect.endY = touch.screenY;
        
    });

    element.addEventListener('touchend', function (event) {
        if (
            // Horizontal move.
            (Math.abs(detect.endX - detect.startX) > detect.minX)
                && (Math.abs(detect.endY - detect.startY) < detect.maxY)
        ) {
            direction = (detect.endX > detect.startX) ? 'right' : 'left';
        } else if (
            // Vertical move.
            (Math.abs(detect.endY - detect.startY) > detect.minY)
                && (Math.abs(detect.endX - detect.startX) < detect.maxX)
        ) {
            direction = (detect.endY > detect.startY) ? 'down' : 'up';
        }

        if ((direction !== null) && (typeof f === 'function')) {
            f(element, direction);
        }
    });
}