"use strict";

import { setupCanvas } from "../modules/canvas.js";
import { setupLua } from "../modules/lua.js";

import { images, tilemaps } from "../modules/graphics.js";

export var filesLoadedCount = 0;

export var sounds = [],
    fonts = [];

export function importFiles() {
    manifest.spritesheets.forEach((imageUrl) => {
        const image = new window.Image();
        image.src = imageUrl;
        image.onload = () => {
            images[imageUrl] = image;

            filesLoadedCount += 1;
        };
    });

    manifest.sounds.forEach((soundUrl) => {
        const sound = new window.Audio();
        sound.src = soundUrl;
        sounds[soundUrl] = sound;

        filesLoadedCount += 1;
    });

    manifest.tilemaps.forEach((tilemapUrl) => {
        fetch(tilemapUrl)
            .then((response) => response.json())
            .then((json) => {
                tilemaps[tilemapUrl] = json.layers[0];
                filesLoadedCount += 1;

                console.log(tilemaps[tilemapUrl]);
            });
    });

    // let font = new FontFace(`font-${fonts.length}`, `url(${url})`);
    // font.load();
    // document.fonts.add(font);
    // fonts.push(fonts.length);
}

export function setup() {
    setupCanvas(manifest.resolution.width, manifest.resolution.height);
    setupLua();
    importFiles();
}

export function checkIsLoaded(init, loop) {
    if (
        filesLoadedCount ==
        manifest.scripts.length +
            manifest.spritesheets.length +
            manifest.sounds.length +
            manifest.tilemaps.length
    ) {
        init();
        loop();
    } else {
        setTimeout(() => {
            checkIsLoaded(init, loop);
        }, 0);
    }
}
