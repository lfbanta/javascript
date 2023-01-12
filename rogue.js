windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("window is %d by %d", windowWidth, windowHeight);

//set the canvas and declare height and width based on the window
canvas = document.getElementById("mainCanvas");
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
var gameBorderWidth = 1110;
var gameBorderHeight = 600;

//set up the context for the animation
context = canvas.getContext("2d");

var blockSize = 30;
var char = [1, 601 - blockSize, blockSize + 1, 601];
var moveDelay = 300;
var lastMoved = 0;
var playerHealth = 10;
var maxHealth = 10;
var moveKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];
var enemies = [];
var viableMoves = [];
var charAttackSound = document.getElementById("charAttack");
var directionFacing = 'right';

function drawAll()
  /*
    Purpose: draw some stuff
    Inputs: None, but is affected by other functions
    Returns: None, loops itself
  */
{
  if(playerHealth > 0)
  {
    //draw box
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, gameBorderWidth + 2, gameBorderHeight + 2);
    context.fillStyle = "#ffffff";
    context.fillRect(1, 1, gameBorderWidth, gameBorderHeight);
    context.fillStyle = "#00ff00";
    context.fillRect(char[0], char[1], char[2] - char[0], char[3] - char[1]);
    runEnemies(enemies, context);
    drawHealthbar()
    context.stroke();
    //loop the animation
    window.requestAnimationFrame(drawAll);
  }
  else{
    alert("Game Over")
    document.removeEventListener("keydown", myKeyDown)
  }
}

enemies.push(new Enemy(5, 2, 1, 181, 601 - blockSize))
enemies.push(new Enemy(5, 2, 1, 91, 601 - blockSize))

//allow for keybinds
document.addEventListener("keydown", myKeyDown);

//start animation
window.requestAnimationFrame(drawAll);
