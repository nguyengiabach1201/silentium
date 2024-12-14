"use strict";

import { ctx, canvas } from "./canvas";

export var images = [];
export var tilemaps = [];
export var drewTiles = [];

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length != 6) {
        hex = hex
            .split("")
            .map((item) => {
                if (item == "#") {
                    return item;
                }
                return item + item;
            })
            .join("");
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r: r, g: g, b: b };
}

export function cls() {
    drewTiles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function pget(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelData = imageData.data;

    return rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
}

export function pset(x, y, col) {
    let rgb = hexToRgb(col);
    ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    ctx.fillRect(x, y, 1, 1);
    ctx.fillStyle = `black`;
}

export function spr(img, x, y, u, v) {
    ctx.drawImage(
        images[img],
        u * manifest.sprites.width,
        v * manifest.sprites.height,
        manifest.sprites.width,
        manifest.sprites.height,
        x,
        y,
        manifest.sprites.width,
        manifest.sprites.height
    );
}

export function map(tilemap, src, x, y, u, v, w, h) {
    for (let i = u; i < w; i++) {
        for (let j = v; j < h; j++) {
            if (w <= tilemaps[tilemap].width && h <= tilemaps[tilemap].height) {
                let _v =
                    Math.ceil(
                        tilemaps[tilemap].data[
                            j * tilemaps[tilemap].width + i
                        ] /
                            Math.floor(
                                images[src].width / manifest.sprites.width
                            )
                    ) - 1;
                let _u =
                    tilemaps[tilemap].data[j * tilemaps[tilemap].width + i] -
                    (images[src].width / manifest.sprites.width) * _v -
                    1;

                spr(
                    src,
                    x + i * manifest.sprites.width,
                    y + j * manifest.sprites.height,
                    _u,
                    _v
                );

                drewTiles.push({
                    x: x + i * manifest.sprites.width,
                    y: y + j * manifest.sprites.height,
                    u: _u,
                    v: _v,
                });
            }
        }
    }
}

export function mget(x, y) {
    let tile = drewTiles.find(
        (tile) =>
            Math.abs(tile.x - x) < manifest.sprites.width &&
            Math.abs(tile.y - y) < manifest.sprites.height
    );
    return tile != undefined ? { u: tile.u, v: tile.v } : { u: -1, v: -1 };
}

export function mset(src, x, y, u, v) {
    spr(src, x * manifest.sprites.width, y * manifest.sprites.height, u, v);
}

export function text(s, x, y) {
    ctx.fillText(s, x, y);
}
