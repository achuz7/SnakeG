//My First Project

//Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

//Sanke
const snakeBox = 20;
const totalMoves = canvasSize / snakeBox;

//food
const apple = new Image();
apple.src = "images/apple.png";

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let left = new Audio();
let right = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";

//Define snake
let snake = [];
snake[0] = {
    x: 9 * snakeBox,
    y: 10 * snakeBox
};

//Create food 
let food = {};
getFood();

//Score
let score = 0;

//Snake Direstion
let dir = "";
document.addEventListener("keydown", direction);

function direction() {
    let key = event.keyCode;


    if (key == 37 && dir != "RIGHT") {
        dir = "LEFT";
        left.play();

    } else if (key == 38 && dir != "DOWN") {
        dir = "UP";
        up.play();

    } else if (key == 39 && dir != "LEFT") {
        dir = "RIGHT";
        right.play();

    } else if (key == 40 && dir != "UP") {
        dir = "DOWN";
        down.play();

    }
}


function getFood() {
    food = {
        x: Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox,
        y: Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox
    };

}

function collisionDetection(head, ar) {
    //Collision
    for (let i = 0; i < ar.length; i++) {
        if (ar[i].x == head.x && ar[i].y == head.y) {
            return true;
        }
    }
    return false;
}


function render() {
    ctx.fillStyle = "Purple";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; ++i) {
        ctx.fillStyle = i == 0 ? "black" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, snakeBox, snakeBox);

        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x, snake[i].y, snakeBox, snakeBox);

    }

    ctx.drawImage(apple, food.x, food.y, snakeBox, snakeBox);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (dir == "LEFT") snakeX -= snakeBox;
    if (dir == "RIGHT") snakeX += snakeBox;
    if (dir == "UP") snakeY -= snakeBox;
    if (dir == "DOWN") snakeY += snakeBox;

    // If Snake Eat Food 
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        getFood();

    } else {
        snake.pop();

    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //Collide
    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collisionDetection(newHead, snake)) {
        gameOver();
        return;
    }

    snake.unshift(newHead);

    ctx.fillStyle = "yellow";
    ctx.font = "20px tahoma";
    ctx.fillText(score, 10, 40);

}

render();
var gm = setInterval(render, 100);

function gameOver() {
    clearInterval(gm);
    dead.play();
    ctx.fillStyle = "black";
    ctx.font = "40px tahoma";
    ctx.fillText("Game Over", canvasSize / 2 - 100, canvasSize / 2);
}