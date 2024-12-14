"use strict";

let keysHeld = {},
    keysPressed = {},
    keysReleased = {},
    previousKeysHeld = {};

document.addEventListener("keydown", (event) => {
    if (!keysHeld[event.key]) {
        keysHeld[event.key] = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (keysHeld[event.key]) {
        keysHeld[event.key] = false;
    }
});

export function inputHandler() {
    for (const key in keysHeld) {
        keysPressed[key] = !previousKeysHeld[key] && keysHeld[key];
    }

    for (const key in keysHeld) {
        keysReleased[key] = previousKeysHeld[key] && !keysHeld[key];
    }

    for (const key in keysHeld) {
        previousKeysHeld[key] = keysHeld[key];
    }
}

export function btn(key) {
    return keysHeld[key] == undefined ? false : keysHeld[key];
}

export function btnp(key) {
    return keysPressed[key] == undefined ? false : keysPressed[key];
}

export function btnr(key) {
    return keysReleased[key] == undefined ? false : keysReleased[key];
}
