class Enemy{

	constructor(health, damage, range, x1, y1){
	  	this.health = health;
	  	this.damage = damage;
	  	this.range = range * blockSize;
	  	this.x1 = x1;
	  	this.y1 = y1;
	  	this.x2 = x1 + blockSize;
	  	this.y2 = y1 + blockSize;
		this.dontMove = NaN;
		this.reset = true;
	}
  
	checkCollision()
	{
	  	var i, enemy;
	  	var possibleMoves = ['down', 'up', 'right', 'left'];
		// check the collision with each individual enemy
	  	for (i=0; i < enemies.length; i++)
	  	{
			enemy = enemies[i]
			if (enemy != this)
			{
		 		if (enemy.x1 == this.x1)
		  		{
					if (enemy.y1 + blockSize == this.y1)
					{
					possibleMoves.splice(possibleMoves.indexOf('up'), 1);
					}
					else if (enemy.y1 - blockSize == this.y1)
					{
			 		possibleMoves.splice(possibleMoves.indexOf('down'), 1);
					}
		  		}
		  		else if (enemy.y1 == this.y1)
		  		{
				if (enemy.x1 + blockSize == this.x1)
				{
			  		possibleMoves.splice(possibleMoves.indexOf('left'), 1);
				}
				else if (enemy.x1 - blockSize == this.x1)
				{
			  		possibleMoves.splice(possibleMoves.indexOf('right'), 1);
				}
		  		}
			}
	  	}
		// check the collision with the boundaries of the screen
		if(this.x1 == 1)
		{
			possibleMoves.splice(possibleMoves.indexOf('left'), 1);
		}
		else if(this.x2 == gameBorderWidth + 1)
		{
			possibleMoves.splice(possibleMoves.indexOf('right'), 1);
		}
		if(this.y1 == 1)
		{
			possibleMoves.splice(possibleMoves.indexOf('up'), 1);
		}
		else if(this.y2 == gameBorderHeight + 1)
		{
			possibleMoves.splice(possibleMoves.indexOf('down'), 1);
		}
	  	return possibleMoves
	}
  
	takeAction()
	{
		this.reset = true
	  	viableMoves = this.checkCollision();
	  	console.log(viableMoves);
		var moved = false;
	  	//Attack the character, move if can't
	  	if (this.x1 < char[0] && moved == false && this.dontMove != 'right')
	  	{
			console.log('detecting the location is left')
			if (this.y1 != char[1] || char[0] - this.x1 > this.range)
			{
				if(viableMoves.includes('right'))
				{
					this.x1 += blockSize;
					this.x2 += blockSize;
					moved = true;
				}
				else if(viableMoves.includes('down') && this.y1 <= char[1])
				{
					this.y1 += blockSize;
					this.y2 += blockSize;
					moved = true;
				}
				else if(viableMoves.includes('up'))
				{
					this.y1 -= blockSize;
					this.y2 -= blockSize;
					moved = true;
				}
			}
			else
			{
				this.attack('right');
				moved = true;
			}
		}
	  	if (this.x1 > char[0] && moved == false && this.dontMove != 'left')
	  	{
			console.log('detecting the location is right')
			if (this.y1 != char[1] || this.x1 - char[0] > this.range)
			{
				if(viableMoves.includes('left'))
				{
					this.x1 -= blockSize;
					this.x2 -= blockSize;
					moved = true;
				}
				else if(viableMoves.includes('down') && this.y1 <= char[1])
				{
					this.y1 += blockSize;
					this.y2 += blockSize;
					moved = true;
				}
				else if(viableMoves.includes('up'))
				{
					this.y1 -= blockSize;
					this.y2 -= blockSize;
					moved = true;
				}
			}
			else
			{
				this.attack('left');
			}
	  	}
	  	if (this.y1 < char[1] && moved == false)
	  	{
			console.log('detecting the location is above')
			if (this.x1 != char[0] || char[1] - this.y1 > this.range)
			{
				if(viableMoves.includes('down'))
				{
					this.y1 += blockSize;
					this.y2 += blockSize;
					moved = true;
				}
				else if(viableMoves.includes('left'))
				{
					this.x1 -= blockSize;
					this.x2 -= blockSize;
					moved = true
					// prevent them from just mpving back on the next move
					this.dontMove = 'right';
					this.reset = false;
				}
				else if(viableMoves.includes('right'))
				{
					this.x1 += blockSize;
					this.x2 += blockSize;
					moved = true;
					this.dontMove = 'left';
					this.reset = false;
				}
			}
			else
			{
				this.attack('down')
			}
	  	}
	  	if (this.y1 > char[1] && moved == false)
	  	{
			console.log('detecting the location is down')
			if (this.x1 != char[0] || this.y1 - char[1] > this.range)
			{
				if(viableMoves.includes('up'))
				{
					this.y1 -= blockSize;
					this.y2 -= blockSize;
					moved = true;
				}
				else if(viableMoves.includes('left'))
				{
					this.x1 -= blockSize;
					this.x2 -= blockSize;
					moved = true
					// prevent them from just mpving back on the next move
					this.dontMove = 'right';
					this.reset = false;
				}
				else if(viableMoves.includes('right'))
				{
					this.x1 += blockSize;
					this.x2 += blockSize;
					moved = true;
					this.dontMove = 'left';
					this.reset = false;
				}
			}
			else
			{
				this.attack('up');
			}
	 	}
		if(this.reset)
		{
			this.dontMove = NaN;
		}
	}

	attack(direction)
	{
		//attack the player, only called if within range
		playerHealth -= this.damage;
	}
}

function playerEnemyCollision()
{
	var i, enemy;
	var possibleMoves = ['down', 'up', 'right', 'left'];
	for (i=0; i < enemies.length; i++)
	{
		enemy = enemies[i]
		if (char[0] == enemy.x1)
		{
    		if (char[1] + blockSize == enemy.y1)
    		{
				possibleMoves.splice(possibleMoves.indexOf('down'), 1);
			}
			else if (char[1] - blockSize == enemy.y1)
			{
				possibleMoves.splice(possibleMoves.indexOf('up'), 1);
			}
    	}
    	else if (char[1] == enemy.y1)
    	{
      		if (char[0] + blockSize == enemy.x1)
      		{
        		possibleMoves.splice(possibleMoves.indexOf('right'), 1);
      		}
      		else if (char[0] - blockSize == enemy.x1)
      		{
        		possibleMoves.splice(possibleMoves.indexOf('left'), 1);
      		}
    	}
	}
	return possibleMoves
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
	else if (keyPressed == " ")
	{
		attack()
		charAttackSound.play()
	}
}

function attack()
{
	charAttackSound.play()
	var i, enemy;
	if(directionFacing == "right")
	{
		console.log('detection direction facing')
		for(i=0; i < enemies.length; i++)
		{
			enemy = enemies[i];
			if (enemy.y1 == char[1])
			{
				console.log('detecting on same y')
				if (enemy.x1 == char[2])
				{
					console.log('should attack')
					enemy.health -= 5;
					if(enemy.health <= 0)
					{
						enemies.splice(enemies.indexOf(enemy), 1)
					}
					break
				}
			}
		}
	}
	else if(directionFacing == "left")
	{
		for(i=0; i<enemies.length; i++)
		{
			enemy = enemies[i];
			if (enemy.y1 == char[1])
			{
				if (enemy.x2 == char[0])
				{
					enemy.health -= 5;
					if(enemy.health <= 0)
					{
						enemies.splice(enemies.indexOf(enemy), 1)
					}
					break
				}
			}
		}
	}
	else if(directionFacing == 'down')
	{
		for(i=0; i<enemies.length; i++)
		{
			enemy = enemies[i];
			if (enemy.x1 == char[0])
			{
				if (char[3] == enemy.y1)
				{
					enemy.health -= 5;
					if(enemy.health <= 0)
					{
						enemies.splice(enemies.indexOf(enemy), 1)
					}
					break
				}
			}
		}
	}
	else
	{
		for(i=0; i<enemies.length; i++)
		{
			enemy = enemies[i];
			if (enemy.x1 == char[0])
			{
				if (char[1] == enemy.y2)
				{
					enemy.health -= 5;
					if(enemy.health <= 0)
					{
						enemies.splice(enemies.indexOf(enemy), 1)
					}
					break
				}
			}
		}
	}
}

function moveChar(direction)
/*
Purpose: move the character
Inputs: the key that was pressed
Returns: None, moves the main character
*/
{
	viableMoves = playerEnemyCollision();
	//moves the character
	if(direction == "w" || direction == "arrowup")
	{
		directionFacing = 'up'
		if(char[1] > 1 && viableMoves.includes('up'))
    	{
      		char[1] -= blockSize;
      		char[3] -= blockSize;
    	}
  	}
  	else if(direction == "a" || direction == "arrowleft")
  	{
		directionFacing = 'left'
    	if(char[0] > 1 && viableMoves.includes('left'))
    	{
      		char[0] -= blockSize;
      		char[2] -= blockSize;
    	}
  	}
  	else if(direction == "s" || direction == "arrowdown")
  	{
		directionFacing = 'down'
		if(char[3] < gameBorderHeight && viableMoves.includes('down'))
    	{
      		char[1] += blockSize;
      		char[3] += blockSize;
    	}
 	}
  	else if (direction == "d" || direction == "arrowright")
  	{
		directionFacing = 'right'
    	if(char[2] < gameBorderWidth && viableMoves.includes('right'))
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
  	context.fillStyle = "#fb0015";
  	for (i=0; i < listOfEnemies.length; i++)
  	{
    	enemy = listOfEnemies[i];
    	context.fillRect(enemy.x1, enemy.y1, enemy.x2 - enemy.x1, enemy.y2 - enemy.y1);
  	}
  
}

function drawHealthbar(){
	context.fillStyle = "#000000";
	context.fillRect(0, 610, 202, 50)
	context.fillStyle = "#ffffff";
	context.fillRect(1, 611, 200, 48)
	context.fillStyle = "#ff0000";
	context.fillRect(1, 611, playerHealth/maxHealth * 200, 48)
}