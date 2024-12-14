print("Hello")
print(math.abs(-5))

require("test")

function init()
    print("Init")
    map("2.json", "game.png", 0,0,0,0,10,10)

end

function update()
    -- print(mget(200,128))
    test = mget(0,0)
    print(test.u)
    -- cls()
    -- if btn("a") then
    --     print("loop")
    -- end
    -- print(pget(100,5))
    -- pset(100,10,"#f00")

    -- spr("game.jpg",10,10,10,10)

    -- text("Hello", 5,5)
end