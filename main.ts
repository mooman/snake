let screenWidth = scene.screenWidth()
let screenHeight = scene.screenHeight()
let gridSize = 8
let snake = [[10, 7], [10, 8], [10, 9]]
let dx = 0
let dy = 1
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
    newFood()
    game.onUpdateInterval(300, function gameLoop() {
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
}

function newFood() {
    
}

function moveSnake() {
    
    let head = snake[0]
    let newHead = [head[0] + dx, head[1] + dy]
    if (newHead[0] > screenWidth / gridSize || newHead[0] <= 0 || newHead[1] > screenHeight / gridSize || newHead[1] <= 0) {
        game.over(false)
    }
    
    snake.unshift(newHead)
    snake.pop()
}

initialize()
