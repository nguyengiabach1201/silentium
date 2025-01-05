require("./lua/function")
require("./lua/player")
require("./lua/world")

function update()
    MovePlayer()

    Test = mget(Player.x, Player.y)
    -- print(Test.u)
end

function draw()
    cls()
    DrawWorld()
    DrawPlayer()
end
