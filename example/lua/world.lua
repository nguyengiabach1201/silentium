function DrawWorld()
    for x = 0, 8, 1 do
        for y = 0, 8, 1 do
            spr("spritesheet.png", x * 16, y * 16, 0, 0)
        end
    end
    map("./tilemap/tilemap.json", "spritesheet.png", 16, 16, 0, 0, 7, 8)
end
