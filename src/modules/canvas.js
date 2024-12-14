"use strict";

export var canvas, ctx;

const pixelRatio = (function () {
    const ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;

    return dpr / bsr;
})();

const highDPICanvas = function (w, h, ratio) {
    if (!ratio) {
        ratio = pixelRatio;
    }
    const canvas = document.createElement("canvas");
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    canvas.id = "alpha-canvas";
    return canvas;
};

function fullCanvasHandler() {
    const ratio = canvas.width / canvas.height;

    function resizeCanvas() {
        let width, height;

        if (window.innerWidth / ratio <= window.innerHeight) {
            width = window.innerWidth;
            height = window.innerWidth / ratio;
        } else {
            width = window.innerHeight * ratio;
            height = window.innerHeight;
        }

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}

export function setupCanvas(width, height) {
    canvas = highDPICanvas(width, height, 1);
    canvas.style.background = "white";
    ctx = canvas.getContext("2d", {
        willReadFrequently: true,
    });
    
    let container = document.createElement("div");
    container.appendChild(canvas);
    document.body.appendChild(container);

    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";

    ctx.imageSmoothingEnabled = false;
    document.head.appendChild(document.createElement("style")).innerHTML =
        "canvas { image-rendering: pixelated; border: 1px solid black; }";

    fullCanvasHandler();
}
