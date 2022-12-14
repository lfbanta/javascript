windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("window is %d by %d", windowWidth, windowHeight);

//set the canvas and declare height and width based on the window
canvas = document.getElementById("mainCanvas");
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 30;
canvas.style.border = "1px solid black";

var blockSize = 30;
var char = [0, 0, blockSize, blockSize];
var moveDelay = 300;
var lastMoved = 0;
var playerHealth = 10;
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
  //draw box
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#00ff00";
  context.fillRect(char[0], char[1], char[2] - char[0], char[3] - char[1]);
  runEnemies(enemies, context);
  context.stroke();
  //loop the animation
  window.requestAnimationFrame(drawAll);
}

//set up the context for the animation
context = canvas.getContext("2d");
enemies.push(new Enemy(5, 2, 1, 180, 0))
enemies.push(new Enemy(5, 2, 1, 90, 0))

//allow for keybinds
document.addEventListener("keydown", myKeyDown);

//start animation
window.requestAnimationFrame(drawAll);
