const grid = document.querySelector(".grid");
// score
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;

//for the arrow right
const boardWidth = 560;

//timerid
let timerId;

//ball diameter
let ballDiameter = 20;

//boardHeight
const boardHeight = 300;

// x and y directions of the ball
let xDirection = 2;
let yDirection = 2;

//position for the user
const userStart = [230, 10];
let currentPosition = userStart;

// position for the ball
const ballStart = [270, 40];
let BallCurrentPosition = ballStart;

//create block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// draw all my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
// draw my block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

//add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

// draw the ball
function drawBall() {
  ball.style.left = BallCurrentPosition[0] + "px";
  ball.style.bottom = BallCurrentPosition[1] + "px";
}

//draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
  }
}

document.addEventListener("keydown", moveUser);

// add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// move ball
function moveBall() {
  // x axis
  BallCurrentPosition[0] += xDirection;
  // y axis
  BallCurrentPosition[1] += yDirection;
  // draw ball
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

// check for collisions
function checkForCollisions() {
  //check for wall collisions
  if (
    BallCurrentPosition[0] >= boardWidth - ballDiameter ||
    BallCurrentPosition[1] >= boardHeight - ballDiameter ||
    BallCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  // check for game over
  if ((BallCurrentPosition[1] = 0)) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection == 2 && yDirection == 2) {
    yDirection = -2;
    return;
  }
  //if we hit that wall we want to change the direction
  if (xDirection == 2 && yDirection == -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
