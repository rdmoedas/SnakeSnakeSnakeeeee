let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 18;
let snake = [];
snake[0] = {
    x: 12 * box,
    y: 7 * box
}
let direction = 'rigth';
let food = {
    x: Math.floor(Math.random() * 24 + 1) * box,
    y: Math.floor(Math.random() * 14 + 1) * box
};

function newFood() {
    food = {
        x: Math.floor(Math.random() * 24 + 1) * box,
        y: Math.floor(Math.random() * 14 + 1) * box
    };
}

function criarBG(){
    context.fillStyle = 'darkslategray';
    context.fillRect(0, 0, 25 * box, 15 * box);
}

function criarCobrinha(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = 'whitesmoke';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida(){
    context.fillStyle = 'yellowgreen';
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){
    if(snake[0].x > 24 * box && direction != "left") snake[0].x = 0;
    if(snake[0].x < 0 && direction != "right") snake[0].x = 24 * box;
    if(snake[0].y > 14 * box && direction != "up") snake[0].y = 0;
    if(snake[0].y < 0 && direction != "down") snake[0].y = 14 * box;   

    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over');
        }
    }

    criarBG();
    criarCobrinha();
    criarComida()

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        newFood();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);