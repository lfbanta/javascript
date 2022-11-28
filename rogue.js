function drawAll()
  /*
    Purpose: draw some stuff
    Inputs: None, but is affected by other functions
    Returns: None, loops itself
  */
{
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

//start animation
window.requestAnimationFrame(drawAll);
