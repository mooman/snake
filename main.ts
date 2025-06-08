let screenWidth = scene.screenWidth()
let screenHeight = scene.screenHeight()
let gridSize = 8
let snake = [[10, 7], [10, 8], [10, 9]]
let dx = 0
let dy = -1
let food = [0, 0]
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function on_button_pressed() {
    
    if (controller.left.isPressed() && dx != 1) {
        dx = -1
        dy = 0
    } else if (controller.right.isPressed() && dx != -1) {
        dx = 1
        dy = 0
    } else if (controller.up.isPressed() && dy != 1) {
        dx = 0
        dy = -1
    } else if (controller.down.isPressed() && dy != -1) {
        dx = 0
        dy = 1
    }
    
})
function initialize() {
    let difficulty = game.askForNumber("Difficulty 1,2,3", 1, true)
    if (difficulty == 1) {
        difficulty = 300
    } else if (difficulty == 2) {
        difficulty = 100
    } else if (difficulty == 3) {
        difficulty = 50
    }
    
    info.player1.setScore(0)
    newFood()
    game.onUpdateInterval(difficulty, function gameLoop() {
        moveSnake()
        drawScreen()
    })
}

function drawScreen() {
    let x: number;
    let y: number;
    let snakeSprite: Sprite;
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    for (let segment of snake) {
        x = segment[0] * gridSize - gridSize / 2
        y = segment[1] * gridSize - gridSize / 2
        snakeSprite = sprites.create(assets.image`snakeSegment`, SpriteKind.Player)
        snakeSprite.setPosition(x, y)
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    let foodSprite = sprites.create(assets.image`food`, SpriteKind.Food)
    let fx = food[0] * gridSize - gridSize / 2
    let fy = food[1] * gridSize - gridSize / 2
    foodSprite.setPosition(fx, fy)
}

function newFood() {
    let foodX: number;
    let foodY: number;
    
    let insideSnake = true
    while (insideSnake) {
        foodX = randint(1, screenWidth / gridSize - 1)
        foodY = randint(1, screenHeight / gridSize - 1)
        insideSnake = false
        for (let segment of snake) {
            if (foodX == segment[0] && foodY == segment[1]) {
                insideSnake = true
            }
            
        }
    }
    food = [foodX, foodY]
}

function moveSnake() {
    
    let head = snake[0]
    let newHead = [head[0] + dx, head[1] + dy]
    if (newHead[0] > screenWidth / gridSize || newHead[0] <= 0 || newHead[1] > screenHeight / gridSize || newHead[1] <= 0) {
        game.over(false)
    }
    
    let insideSnake = false
    for (let segment of snake) {
        if (newHead[0] == segment[0] && newHead[1] == segment[1]) {
            insideSnake = true
        }
        
    }
    if (insideSnake) {
        game.over(false)
    }
    
    snake.unshift(newHead)
    if (food[0] == newHead[0] && food[1] == newHead[1]) {
        newFood()
        info.player1.changeScoreBy(1)
    } else {
        snake.pop()
    }
    
}

initialize()
