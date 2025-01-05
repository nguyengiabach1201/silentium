const manifest = {
    name: "Test",
    version: "v0.1",
    resolution: {
        width: 144,
        height: 144,
    },
    sprites: {
        width: 16,
        height: 16,
    },
    scripts: [
        "./lua/main.lua",
        "./lua/player.lua",
        "./lua/world.lua",
        "./lua/function.lua",
    ],
    spritesheets: ["spritesheet.png"],
    sounds: [],
    tilemaps: ["./tilemap/tilemap.json"],
    fonts: [],
};
