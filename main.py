screenWidth = scene.screen_width()
screenHeight = scene.screen_height()
gridSize = 8

snake: List[List[number]] = [[10, 7], [10, 8], [10,9]]
dx = 0
dy = 1

controller.any_button.on_event(ControllerButtonEvent.PRESSED, on_button_pressed)

def initialize():
    newFood()
    game.on_update_interval(300, gameLoop)
    
def drawScreen():
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    for segment in snake:
        x = (segment[0] * gridSize) - gridSize/2
        y = (segment[1] * gridSize) - gridSize/2
        snakeSprite = sprites.create(assets.image('snakeSegment'), SpriteKind.player)
        snakeSprite.set_position(x, y)

def newFood():
    pass

def moveSnake():
    global snake
    head = snake[0]
    newHead = [head[0] + dx, head[1] + dy]

    if (newHead[0] > (screenWidth / gridSize) or
        newHead[0] <= 0 or
        newHead[1] > (screenHeight / gridSize) or
        newHead[1] <= 0):
        game.over(False)
    
    snake.unshift(newHead)
    snake.pop()

def on_button_pressed():
    global dx,dy

    if controller.left.is_pressed() and dx != 1:
        dx = -1
        dy = 0
    elif controller.right.is_pressed() and dx != -1:
        dx = 1
        dy = 0
    elif controller.up.is_pressed() and dy != 1:
        dx = 0
        dy = -1
    elif controller.down.is_pressed() and dy != -1:
        dx = 0
        dy = 1

def gameLoop():
    moveSnake()
    drawScreen()

initialize()
