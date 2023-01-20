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
var charSprite = document.getElementById("charSprite")
var char = [1, 1, blockSize + 1, blockSize + 1];
var moveDelay = 300;
var lastMoved = 0;
var playerHealth = 10;
var maxHealth = 10;
var damage = 5;
var armor = 3;
var moveKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];
var enemies = [];
var viableMoves = [];
var charAttackSound = document.getElementById("charAttack");
var directionFacing = 'right';
var onscreenBuffs = [];
var buffType;
var buffStrength;
var wave = 0;

function startGame(){
  blockSize = 30;
  char = [1, 1, blockSize + 1, blockSize + 1];
  moveDelay = 300;
  lastMoved = 0;
  playerHealth = 10;
  maxHealth = 10;
  damage = 5;
  armor = 3;
  moveKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];
  enemies = [];
  viableMoves = [];
  charAttackSound = document.getElementById("charAttack");
  directionFacing = 'right';
  onscreenBuffs = [];
  wave = 0;
  //allow keybinds
  document.addEventListener("keydown", myKeyDown);
  document.removeEventListener("keydown", startGame);
  window.requestAnimationFrame(drawAll);
}

function drawAll()
  /*
    Purpose: draw some stuff
    Inputs: None, but is affected by other functions
    Returns: None, loops itself
  */
{
  if(playerHealth > 0)
  {
    if (enemies.length == 0){
      wave += 1;
      newEnemies()
    }
    //draw box
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.fillRect(0, 0, gameBorderWidth + 2, gameBorderHeight + 2);
    context.fillStyle = "#ffffff";
    context.fillRect(1, 1, gameBorderWidth, gameBorderHeight);
    context.fillStyle = "#00ff00";
    //context.fillRect(char[0], char[1], char[2] - char[0], char[3] - char[1]);
    context.drawImage(charSprite, char[0], char[1], blockSize, blockSize)
    runBuffs();
    runEnemies(enemies);
    displayInfo()
    context.stroke();
    //loop the animation
    window.requestAnimationFrame(drawAll);
  }
  else{
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000"
    context.font = "bold 70px Courier New"
    context.fillText("Game Over", 400, 300)
    context.font = "bold 30px Courier New"
    context.fillText("Press any key to start again", 350, 350)
    document.removeEventListener("keydown", myKeyDown);
    document.addEventListener("keydown", startGame);
  }
}

//splashScreen
context.font = "bold 70px Courier New"
context.fillText("Rogue?", 500, 200)
context.font = "bold 30px Courier New"
context.fillText("wasd or arrow keys to move", 400, 250)
context.fillText("Space to attack", 475, 300)
context.fillText("Press any key to begin", 425, 350)
document.addEventListener("keydown", startGame);
