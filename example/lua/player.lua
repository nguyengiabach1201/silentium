Player = {
    x = 0, y = 0, speed = 1, dX = 0, dY = 0
}
PlayerSprite = { x = 0, y = 3 }

function MovePlayer()
    Player.dX, Player.dY = 0, 0
    if not (btn("ArrowLeft") and btn("ArrowRight")) then
        if btn("ArrowLeft") then
            Player.dX = -1
            PlayerSprite = { x = 0, y = 3 }
        end
        if btn("ArrowRight") then
            Player.dX = 1
            PlayerSprite = { x = 1, y = 3 }
        end
    end

    if not (btn("ArrowUp") and btn("ArrowDown")) then
        if btn("ArrowUp") then
            Player.dY = -1
            PlayerSprite = { x = 3, y = 3 }
        elseif btn("ArrowDown") then
            Player.dY = 1
            PlayerSprite = { x = 2, y = 3 }
        end
    end

    Player.x = Player.x + Player.dX * Player.speed
    Player.y = Player.y + Player.dY * Player.speed
end

function DrawPlayer()
    spr("spritesheet.png", Player.x, Player.y, PlayerSprite.x, PlayerSprite.y)
end
