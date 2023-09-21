let dir = { x: 0, y: 0 };

let music = new Audio("Music/Music.mp3")
let move = new Audio("Music/Move.mp3")
let food = new Audio("Music/Food.mp3")
let gameover = new Audio("Music/GameOver.mp3")

let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
f = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);
    
    if ((ctime - lastPaintTime)/1000 < 1 / speed) {
        console.log((ctime - lastPaintTime)/1000);
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    music.play();
    if (isCollide(snakeArr)) {
        music.pause();
        gameover.play();
        alert("Game Over !!!!");
        dir = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 15 }];
        f = { x: 6, y: 7 };
        music.play();
        score = 0;
        scoreBox.innerHTML="Score : "+score;
    }

    if (snakeArr[0].x == f.x && snakeArr[0].y == f.y) {
        food.play();
        score+=1;
        scoreBox.innerHTML="Score : "+score;
        snakeArr.unshift({ x: snakeArr[0].x + dir.x, y: snakeArr[0].y + dir.y });
        let a = 2;
        let b = 16;
        f = { x: Math.round(Math.random() * (b - a + 1) + a), y: Math.round(Math.random() * (b - a + 1) + a) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += dir.x;
    snakeArr[0].y += dir.y;


    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = f.y;
    foodElement.style.gridColumnStart = f.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    //dir = { x: 0, y: 1 };
    move.play();
    switch (e.key) {
        case "ArrowUp":
            dir.x = 0;
            dir.y = -1;
            break;

        case "ArrowDown":
            dir.x = 0;
            dir.y = 1;
            break;

        case "ArrowLeft":
            dir.x = -1;
            dir.y = 0;
            break

        case "ArrowRight":
            dir.x = 1;
            dir.y = 0;
            break;

        default:
            break;
    }
});