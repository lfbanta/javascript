class Buff{
	constructor(buffType, value, x1, y1){
		this.buffType = buffType;
		this.value = value;
		this.x1 = x1;
		this.y1 = y1;
		if(this.buffType == "heal"){
			this.sprite=document.getElementById("heal")
		}
		else if(this.buffType == "health up"){
			this.sprite=document.getElementById("healthUp")
		}
		else if(this.buffType == "damage up"){
			this.sprite=document.getElementById("damageUp")
		}
		else{
			this.sprite=document.getElementById("armorUp")
		}
	}

	pickup(){
		if (this.buffType == "heal"){
			playerHealth += this.value;
			if (playerHealth > maxHealth){
				playerHealth = maxHealth
			}
		}
		else if (this.buffType == "health up"){
			maxHealth += this.value;
			playerHealth += this.value;
		}
		else if (this.buffType == "damage up"){
			damage += this.value;
		}
		else {
			armor += this.value;
		}
	}
}

class Enemy{

	constructor(health, damage, range, x1, y1, sprite){
	  	this.health = health;
	  	this.damage = damage;
	  	this.range = range * blockSize;
	  	this.x1 = x1;
	  	this.y1 = y1;
	  	this.x2 = x1 + blockSize;
	  	this.y2 = y1 + blockSize;
		this.dontMove = NaN;
		this.reset = true;
		this.sprite = document.getElementById("enemyIdleSprite")
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
		var moved = false;
	  	//Attack the character, move if can't
	  	if (this.x1 < char[0] && moved == false && this.dontMove != 'right')
	  	{
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
		let dealtDamage = this.damage - armor;
		if(dealtDamage < 1){dealtDamage = 1;}
		playerHealth -= dealtDamage;
	}

	die(){
		enemies.splice(enemies.indexOf(this), 1)
		if(Math.random() > 0.5){
			buffType = Math.random()
			if(buffType < 0.25){
				buffType = "heal"
				buffStrength = Math.floor(Math.random() * maxHealth * 2) + 1
			}
			else if(buffType < 0.5){
				buffType = "health up"
				buffStrength = Math.floor(Math.random() * wave * 10) + 1
			}
			else if(buffType < 0.75){
				buffType = "damage up"
				buffStrength = Math.floor(Math.random() * wave * 2) + 1
			}
			else{
				buffType = "armor up"
				buffStrength = Math.floor(Math.random() * wave) + 1
			}
			onscreenBuffs.push(new Buff(buffType, buffStrength, this.x1, this.y1))
		}
	}
}

function runBuffs(){
	context.fillStyle = "#0000ff"
	var i, buff;
	for(i=0; i < onscreenBuffs.length; i++){
		buff = onscreenBuffs[i];
		if (char[0] == buff.x1 && char[1] == buff.y1){
			buff.pickup();
			onscreenBuffs.splice(onscreenBuffs.indexOf(buff), 1);
		}
		else{
			context.drawImage(buff.sprite, buff.x1, buff.y1, blockSize, blockSize)
		}
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
	keyPressed = event.key;
	keyPressed = keyPressed.toLowerCase();
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
		for(i=0; i < enemies.length; i++)
		{
			enemy = enemies[i];
			if (enemy.y1 == char[1])
			{
				if (enemy.x1 == char[2])
				{
					enemy.health -= damage;
					if(enemy.health <= 0)
					{
						enemy.die()
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
					enemy.health -= damage;
					if(enemy.health <= 0)
					{
						enemy.die()
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
					enemy.health -= damage;
					if(enemy.health <= 0)
					{
						enemy.die()
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
					enemy.health -= damage;
					if(enemy.health <= 0)
					{
						enemy.die()
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

function runEnemies(listOfEnemies)
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
    	context.drawImage(enemy.sprite, enemy.x1, enemy.y1, enemy.x2 - enemy.x1, enemy.y2 - enemy.y1);
  	}
  
}

function displayInfo(){
	context.fillStyle = "#000000";
	context.fillRect(0, 610, 202, 50)
	context.fillStyle = "#ffffff";
	context.fillRect(1, 611, 200, 48)
	context.fillStyle = "#ff0000";
	context.fillRect(1, 611, playerHealth/maxHealth * 200, 48)
	context.fillStyle = "#000000"
	context.font = "bold 30px Courier New"
	let healthInfo = playerHealth.toString() + "/" + maxHealth.toString()
	context.fillText(healthInfo, 210, 645)
	let damageInfo = "Damage:" + damage.toString();
	context.fillText(damageInfo, 425, 645);
	let armorInfo = "Armor:" + armor.toString();
	context.fillText(armorInfo, 725, 645);
	let waveInfo = "Wave:" + wave.toString();
	context.fillText(waveInfo, 1000, 645)
}

function newEnemies(){
	var i;
	let enemyX, enemyY;
	var enemyDamage, enemyHealth, maxEnemies;
	if(wave < 6){
		enemyDamage = wave;
		enemyHealth = wave * 2 + 3;
	}
	else if (wave < 10){
		enemyDamage = Math.floor(wave * 2);
		enemyHealth = wave * wave / 2 - 5
	}
	else{
		enemyDamage = Math.floor(wave * wave / Math.sqrt(wave))
		enemyHealth = wave * wave / 2
	}
	maxEnemies = wave * 2;
	if(maxEnemies > 30){maxEnemies=30;}
	for(i=0;i<maxEnemies;i++){
		if(Math.random() > 0.5){
			enemyX = Math.floor(Math.random() * gameBorderWidth / 30) * 30 + 1
			enemyY = Math.floor(Math.random() * gameBorderHeight / 30) * 30 + 1
			var x, enemy;
			var goodSpawn = true;
			for(x=0;x<enemies.length;x++){
				enemy = enemies[x];
				if (enemy.x1 == enemyX || char[0] == enemyX){
					goodSpawn = false
				}
				else if(enemy.y1 == enemyY || char[1] == enemyY){
					goodSpawn = false;
				}
			}
			if(goodSpawn){
				enemies.push(new Enemy(enemyHealth, enemyDamage, 1, enemyX, enemyY))
			}
		}
	}
}