//all the constant starts here

let inputDir = { x: 0, y: 0 };
//this is an object where the initial direction of the snake is defined as stop
const foodSound = new Audio("eat.mp3");
const gameOverSound = new Audio("die.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let lastPaintTime = 0;
let speed = 2;
let snakeArr = [{ x: 13, y: 13 }];
//x original x ke taraf hi hota hai 
//par y downside hota hai
food = { x: 13, y: 15 };

//all game function starts here

function main(ctime) {
  window.requestAnimationFrame(main);
  //game ko hamesa hi paint kiya jata hai isliye behtar hoga ki ham setTimeInterval ke jagah 
  //requestAnimationFrame ka use kre
  //main ke under me requestAnimationFrame dale hai to RAF bhi main ko fire krega so ek game loop ban gaya


  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    //yadi time interval se chhota mila to return ho jayenge and gameEngine call ni hoga 
    //and paint ni hoga
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(sArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
      return true;
    }
  }
  if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0)
    return true;

  return false;
}
function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Press any key to play again");
    snakeArr = [{ x: 13, y: 13 }];
    musicSound.play();
    score = 0;
  }

  //eaten the food then increase the score
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    foodSound.play();
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    score = score + 1;
  }
  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    //const element = snakeArr[i];
    snakeArr[i + 1] = { ...snakeArr[i] };
    //last node ko second last node allote kar do fir last bala second last ho jayega
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 2 display snake and food
  //dislay snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  //display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
  //diaplay score
  
}

//main logic starts here

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      //console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      //console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      //console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      //console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});



