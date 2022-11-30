var char = [0, 0, 20, 20];
var moveSpeed = 20;
var moveDelay = 150;
var lastMoved = 0;

function myKeyDown(event)
{
  console.log(event);
  keyPressed = event.key;
  keyPressed = keyPressed.toLowerCase();
  console.log(keyPressed);
  time = new Date();
  //limits how frequent you can move
  if (time.getTime() - moveDelay > lastMoved)
  {
    lastMoved = time.getTime();
    //moves the character
    if(keyPressed == "w" || keyPressed == "arrowup")
    {
      if(char[1] > 0)
      {
        char[1] -= moveSpeed;
        char[3] -= moveSpeed;
      }
    }
    else if(keyPressed == "a" || keyPressed == "arrowleft")
    {
      if(char[0] > 0)
      {
        char[0] -= moveSpeed;
        char[2] -= moveSpeed;
      }
    }
    else if(keyPressed == "s" || keyPressed == "arrowdown")
    {
      if(char[3] < canvas.height)
      {
        char[1] += moveSpeed;
        char[3] += moveSpeed;
      }
    }
    else if (keyPressed == "d" || keyPressed == "arrowright")
    {
      if(char[2] < canvas.width)
      {
        char[0] += moveSpeed;
        char[2] += moveSpeed;
      }
    }
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
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

//set up the context for the animation
context = canvas.getContext("2d");

//allow for keybinds
document.addEventListener("keydown", myKeyDown);

//start animation
window.requestAnimationFrame(drawAll);
