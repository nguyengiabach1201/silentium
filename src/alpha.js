"use strict";

import { setup, checkIsLoaded } from "./setup/boot";
import { luaEngine } from "./modules/lua";
import { inputHandler } from "./modules/input";
import { drewTilemaps } from "./modules/graphics";

const fps = 60;
window.addEventListener("load", function () {
    setup();

    function init() {
        luaEngine.doFile(manifest.scripts[0]);
        let init =
            luaEngine.global.get("init") != null
                ? luaEngine.global.get("init")
                : () => {};
        init();
    }

    const loop = function () {
        inputHandler();
        drewTilemaps = [];

        let update =
            luaEngine.global.get("update") != null
                ? luaEngine.global.get("update")
                : () => {};
        update();

        let draw =
            luaEngine.global.get("draw") != null
                ? luaEngine.global.get("draw")
                : () => {};
        draw();

        setTimeout(() => {
            loop();
        }, 1000 / fps);
    };

    checkIsLoaded(init, loop);
});
