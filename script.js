const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('left-paddle');
const rightPaddle = document.getElementById('right-paddle');
const gameContainer = document.getElementById('game-container');
const scoreLeft = document.getElementById('score-left');
const scoreRight = document.getElementById('score-right');

let ballX = gameContainer.clientWidth / 2 - ball.clientWidth / 2;
let ballY = gameContainer.clientHeight / 2 - ball.clientHeight / 2;
let ballXSpeed = Math.random() < 0.5 ? -3 : 3;
let ballYSpeed = Math.random() < 0.5 ? -3 : 3;
let leftPaddleY = 160;
let rightPaddleY = 160;

//ball spawn position
ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';

function moveBall() {
    //ball position
    ballX += ballXSpeed;
    ballY += ballYSpeed;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    //collision with top/bottom of game container
    if (ballY < 0 || ballY > 380) {
        ballYSpeed = -ballYSpeed;
    }

    //collision with left paddle
    if (ballX < 20 && ballY > leftPaddleY && ballY < leftPaddleY + 80) {
        ballXSpeed = -ballXSpeed;
    }

    //collision with right paddle
    if (ballX > 770 && ballY > rightPaddleY && ballY < rightPaddleY + 80) {
        ballXSpeed = -ballXSpeed;
    }

    //point scored by left player
    if (ballX < 0) {
        score.right++;
        resetBall();
        updateScoreboard();
    }

    // point scored by right player
    if (ballX > 800) {
        score.left++;
        resetBall();
        updateScoreboard();
    }
}

function resetBall() {
    ballX = gameContainer.clientWidth / 2 - ball.clientWidth / 2;
    ballY = gameContainer.clientHeight / 2 - ball.clientHeight / 2;
    ballXSpeed = Math.random() < 0.5 ? -3 : 3;
    ballYSpeed = Math.random() < 0.5 ? -3 : 3;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';


}



function moveLeftPaddle() {
    //left paddle
    if (keys['w'] && leftPaddleY > 0) {
        leftPaddleY -= 5;
    }
    if (keys['s'] && leftPaddleY < 320) {
        leftPaddleY += 5;
    }
    leftPaddle.style.top = leftPaddleY + 'px';
}

function moveRightPaddle() {
    //right paddle 
    if (keys['ArrowUp'] && rightPaddleY > 0) {
        rightPaddleY -= 5;
    }
    if (keys['ArrowDown'] && rightPaddleY < 320) {
        rightPaddleY += 5;
    }
    rightPaddle.style.top = rightPaddleY + 'px';
}

function update() {
    moveBall();
    moveLeftPaddle();
    moveRightPaddle();
}

function loop() {
    update();
    window.requestAnimationFrame(loop);
}

let score = {
    left: 0,
    right: 0
};


function updateScoreboard() {
    scoreLeft.innerText = score.left;
    scoreRight.innerText = score.right;
}





// keyboard movement
let keys = {};
document.addEventListener('keydown', function (event) {
    keys[event.key] = true;
});
document.addEventListener('keyup', function (event) {
    keys[event.key] = false;
});

// game loop
window.requestAnimationFrame(loop);
