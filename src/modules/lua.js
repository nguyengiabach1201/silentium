"use strict";

import { LuaFactory } from "wasmoon";
import { filesLoadedCount } from "../setup/boot";

import { btn, btnp, btnr } from "./input";
import { cls, pget, pset, spr, map, mget, mset, text } from "./graphics";

const factory = new LuaFactory();
export var luaEngine;

async function mountFile(file_path, lua_path) {
    const fileContent = await fetch(file_path).then((data) => data.text());
    await factory.mountFile(lua_path, fileContent);
}

export async function setupLua() {
    luaEngine = await factory.createEngine();
    luaEngine.global.set("btn", btn);
    luaEngine.global.set("btnp", btnp);
    luaEngine.global.set("btnr", btnr);

    luaEngine.global.set("cls", cls);
    luaEngine.global.set("pget", pget);
    luaEngine.global.set("pset", pset);
    luaEngine.global.set("spr", spr);
    luaEngine.global.set("mget", mget);
    luaEngine.global.set("mset", mset);
    luaEngine.global.set("map", map);
    luaEngine.global.set("text", text);

    manifest.scripts.forEach(async (script) => {
        await mountFile(script, script);
        filesLoadedCount += 1;
    });
}
