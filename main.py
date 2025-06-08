screenWidth = scene.screen_width()
screenHeight = scene.screen_height()
gridSize = 8

snake: List[List[number]] = [[10, 7], [10, 8], [10,9]]
dx = 0
dy = -1

food: List[number] = [0, 0]

controller.any_button.on_event(ControllerButtonEvent.PRESSED, on_button_pressed)

def initialize():
    difficulty = game.ask_for_number('Difficulty 1,2,3', 1, True)
    
    if difficulty == 1:
        difficulty = 300
    elif difficulty == 2:
        difficulty = 100
    elif difficulty == 3:
        difficulty = 50

    info.player1.set_score(0)
    newFood()
    game.on_update_interval(difficulty, gameLoop)
    
def drawScreen():
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    for segment in snake:
        x = (segment[0] * gridSize) - gridSize/2
        y = (segment[1] * gridSize) - gridSize/2
        snakeSprite = sprites.create(assets.image('snakeSegment'), SpriteKind.player)
        snakeSprite.set_position(x, y)
    
    sprites.destroy_all_sprites_of_kind(SpriteKind.food)
    foodSprite = sprites.create(assets.image('food'), SpriteKind.food)
    fx = (food[0] * gridSize) - (gridSize / 2)
    fy = (food[1] * gridSize) - (gridSize / 2)
    foodSprite.set_position(fx, fy)
    
def newFood():
    global food
    insideSnake = True
    while insideSnake:
        foodX = randint(1, (screenWidth / gridSize) - 1)
        foodY = randint(1, (screenHeight / gridSize) - 1)
        insideSnake = False

        for segment in snake:
            if foodX == segment[0] and foodY == segment[1]:
                insideSnake = True

    food = [foodX, foodY]

def moveSnake():
    global snake, food
    head = snake[0]
    newHead = [head[0] + dx, head[1] + dy]

    if (newHead[0] > (screenWidth / gridSize) or
        newHead[0] <= 0 or
        newHead[1] > (screenHeight / gridSize) or
        newHead[1] <= 0):
        game.over(False)

    insideSnake = False
    for segment in snake:
        if newHead[0] == segment[0] and newHead[1] == segment[1]:
            insideSnake = True

    if insideSnake:
        game.over(False)

    snake.unshift(newHead)
            
    if food[0] == newHead[0] and food[1] == newHead[1]:
        newFood()
        info.player1.change_score_by(1)
    else:
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
