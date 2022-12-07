var blockSize = 30;
var char = [0, 0, blockSize, blockSize];
var moveDelay = 300;
var lastMoved = 0;
var playerHealth = 10;
var moveKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'];
var enemies = []

class Enemy{

  constructor(health, damage, range, x1, y1){
    this.health = health;
    this.damage = damage;
    this.range = range * blockSize;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x1 + blockSize;
    this.y2 = y1 + blockSize;
  }

  takeAction(){
    //Probably do some stuff to detect where they would need to move, and if they don,t attack the player
    if (this.x1 < char[0])
    {
      
      console.log('detecting the location is left')
      if (this.y1 != char[1])
      {
        this.x1 += blockSize;
        this.x2 += blockSize;
      }
      else if (char[0] - this.x1 > this.range)
      {
        this.x1 += blockSize;
        this.x2 += blockSize;
      }
      else
      {
        this.attack('right');
      }
    }
    else if (this.x1 > char[0])
    {
      console.log('detecting the location is right')
      if (this.x1 - char[0] <= this.range && this.y1 == char[1])
      {
        this.attack('left');
      }
      else
      {
        this.x1 -= blockSize;
        this.x2 -= blockSize;
      }
    }
    else if (this.y1 < char[1])
    {
      console.log('detecting the location is above')
      if (char[1] - this.y1 <= this.range && this.x1 == char[0])
      {
        this.attack('down');
      }
      else
      {
        this.y1 += blockSize;
        this.y2 += blockSize;
      }
    }
    else if (this.y1 > char[1])
    {
      console.log('detecting the location is down')
      if (this.y1 - char[1] <= this.range && this.x1 == char[0])
      {
        this.attack('up');
      }
      else
      {
        this.y1 -= blockSize;
        this.y2 -= blockSize;
      }
    }

  }
  attack(direction)
  {
    //attack the player, only called if within range
    console.log('ATTACK %s', direction)
  }
}

function myKeyDown(event)
/*
Purpose: process key presses
Inputs: The event of a key being pressed
Returns: None, calls a function based on the key pressed
*/
{
  console.log(event);
  keyPressed = event.key;
  keyPressed = keyPressed.toLowerCase();
  console.log(keyPressed);
  if (moveKeys.includes(keyPressed))
  {
    moveChar(keyPressed);
  }
}

function moveChar(direction)
/*
Purpose: move the character
Inputs: the key that was pressed
Returns: None, moves the main character
*/
{
  //moves the character
  if(direction == "w" || direction == "arrowup")
  {
    if(char[1] > 0)
    {
      char[1] -= blockSize;
      char[3] -= blockSize;
    }
  }
  else if(direction == "a" || direction == "arrowleft")
  {
    if(char[0] > 0)
    {
      char[0] -= blockSize;
      char[2] -= blockSize;
    }
  }
  else if(direction == "s" || direction == "arrowdown")
  {
    if(char[3] < canvas.height)
    {
      char[1] += blockSize;
      char[3] += blockSize;
    }
  }
  else if (direction == "d" || direction == "arrowright")
  {
    if(char[2] < canvas.width)
    {
      char[0] += blockSize;
      char[2] += blockSize;
    }
  }
}

function runEnemies(listOfEnemies, screen)
{
  time = new Date();
  time = time.getTime();
  if (time - lastMoved > moveDelay)
  {
    lastMoved = time
    var i, enemy;
    for (i=0; i < listOfEnemies.length; i++)
    {
      enemy = listOfEnemies[i];
      enemy.takeAction();
    }
  }
  for (i=0; i < listOfEnemies.length; i++)
  {
    enemy = listOfEnemies[i];
    screen.fillRect(enemy.x1, enemy.y1, enemy.x2 - enemy.x1, enemy.y2 - enemy.y1);
  }
  
}

function drawAll()
  /*
    Purpose: draw some stuff
    Inputs: None, but is affected by other functions
    Returns: None, loops itself
  */
{
  //draw box
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#000000";
  context.fillRect(char[0], char[1], char[2] - char[0], char[3] - char[1]);
  runEnemies(enemies, context);
  context.stroke();
  //loop the animation
  window.requestAnimationFrame(drawAll);
}

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("window is %d by %d", windowWidth, windowHeight);

//set the canvas and declare height and width based on the window
canvas = document.getElementById("mainCanvas");
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 30;
canvas.style.border = "1px solid black";

//set up the context for the animation
context = canvas.getContext("2d");
firstEnemy = new Enemy(5, 2, 1, 90, 240);
secondEnemy = new Enemy(5, 2, 1, 90, 0);
enemies.push(firstEnemy)
enemies.push(secondEnemy)

//allow for keybinds
document.addEventListener("keydown", myKeyDown);

//start animation
window.requestAnimationFrame(drawAll);
