screenWidth = scene.screen_width()
screenHeight = scene.screen_height()
gridSize = 8

snake: List[List[number]] = [[10, 7], [10, 8], [10,9]]
direction: List[number] = [0, -1]

controller.any_button.on_event(ControllerButtonEvent.PRESSED, on_button_pressed)

def initialize():
    game.on_update_interval(300, gameLoop)
    
def drawScreen():
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    for segment in snake:
        x = segment[0] * gridSize
        y = segment[1] * gridSize
        snakeSprite = sprites.create(assets.image('snakeSegment'), SpriteKind.player)
        snakeSprite.set_position(x, y)

def moveSnake():
    global snake
    head = snake[0]
    newHead = [head[0] + direction[0], head[1] + direction[1]]
    
    snake.unshift(newHead)
    snake.pop()

def on_button_pressed():
    global direction

    if controller.left.is_pressed():
        direction = [-1,0]
    elif controller.right.is_pressed():
        direction = [1, 0]
    elif controller.up.is_pressed():
        direction = [0, -1]
    elif controller.down.is_pressed():
        direction = [0, 1]

def gameLoop():
    moveSnake()
    drawScreen()

initialize()
