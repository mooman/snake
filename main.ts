let screenWidth = scene.screenWidth()
let screenHeight = scene.screenHeight()
let gridSize = 8
let snake = [[10, 7], [10, 8], [10, 9]]
let direction = [0, -1]
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function on_button_pressed() {
    
    if (controller.left.isPressed()) {
        direction = [-1, 0]
    } else if (controller.right.isPressed()) {
        direction = [1, 0]
    } else if (controller.up.isPressed()) {
        direction = [0, -1]
    } else if (controller.down.isPressed()) {
        direction = [0, 1]
    }
    
})
function initialize() {
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
        x = segment[0] * gridSize
        y = segment[1] * gridSize
        snakeSprite = sprites.create(assets.image`snakeSegment`, SpriteKind.Player)
        snakeSprite.setPosition(x, y)
    }
}

function moveSnake() {
    
    let head = snake[0]
    let newHead = [head[0] + direction[0], head[1] + direction[1]]
    snake.unshift(newHead)
    snake.pop()
}

initialize()
