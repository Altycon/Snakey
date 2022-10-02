"use strict";

// Use toLowerCase() to deal with case-sensitive searches later on
const userAgent = navigator.userAgent.toLowerCase(), // may need to use .spit(' ')
availableWidth = screen.availWidth,
availableHeight = screen.availHeight;
export const userIsOnMobileDevice = checkIfUserIsOnMobileDevice(userAgent);

// if(userIsOnMobileDevice) {
//     alert("You're on mobile!")
// } else {
//     alert("You're on desktop!");
// }
export function checkIfUserIsOnMobileDevice(userAgent) {
    if(userAgent.includes('mobi') || userAgent.includes('tablet')){  
       return true;
    }
    if(userAgent.includes('android')) {
        if(availableHeight > availableWidth && availableWidth < 800) {
           // Screen is higher than it’s wide, so we have portrait mode
           return true;
        }
        if(availableWidth > availableHeight && availableHeight < 800) {
           // Screen is wider than it’s high, so we have landscape mode
           return true;
        }
     }
    return false;
}