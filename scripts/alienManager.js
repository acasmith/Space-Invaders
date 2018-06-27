function AlienManager(){
	this.aliens = new List();
	this.targetFrame = Math.floor(Math.random() * 250 + frameCount);
	this.alienPause = false;
	this.flyingSaucer;
	this.saucerFrame = Math.floor(Math.random() * 5000 + frameCount);
	
	//Returns a list containing 11 alien objects.
	this.createRow = function(constructor, yVal){
		var row = new List();
		for(var j = 0; j < 11; j++){
			row.add(new constructor(140 + (40 * j), 200 + yVal), j);
		}
		return row;
	}
	
	//Fills this.aliens with 5 rows of aliens. Gotta be a better way to do this than an if?
	this.createAliens = function(){
		for(var i = 0; i < 5; i++){
			if(i < 2){
				this.aliens.add(this.createRow(Alien, i * -35), i);
			} else if(i < 4){
				this.aliens.add(this.createRow(Alien2, i * -35), i);
			} else{
				this.aliens.add(this.createRow(Alien3, i * -35), i);
			}
			
		}
	}
	
	
	
	//Displays the contents of aliens and the flying saucer if present.
	this.display = function(){
		if(this.flyingSaucer){
			this.flyingSaucer.display();
		}
		for(var i = 0; i < this.aliens.size(); i++){
			for(var j = 0; j < this.aliens.get(i).size(); j++){
				this.aliens.get(i).get(j).display();
			}
		}
	}
	
	//Controls alien movement.
	//N.B: Refactor this algo, there must be a way to avoid iterating twice on a reset?
	this.alienControl = function(){
		if(this.move()){
			this.reset();
		}
	}
	
	//Moves the contents of aliens.
	//Returns true after moving all aliens if one goes out of bounds.
	this.move = function(){
		var reset = false;
		for(var i = 0; i < this.aliens.size(); i++){
			for(var j = 0; j < this.aliens.get(i).size(); j++){
				if(this.aliens.get(i).get(j).move()){
					reset = true;
				}
			}
		}
		return reset;
	}
	
	//Resets aliens by moving down the screen and changing the movement direction.
	this.reset = function(){
		Alien.prototype.direction = !Alien.prototype.direction;	//Way to do this without refering directly to Alien?
		for(var i = 0; i < this.aliens.size(); i++){
			for(var j = 0; j < this.aliens.get(i).size(); j++){
				this.aliens.get(i).get(j).reset();
			}
		}
	}
	
	//Iterates over aliens comparing locations with all player bullets.	TODO: Look at refactoring this, common elements between Aliens and FlyingSaucer checks and responses.
	//If there is a collision, the alien and the bullet are removed.
	this.detectCollisions = function(playerBulletManager){
		for(var k = 0; k < playerBulletManager.size(); k++){
			//Check FlyingSaucer
			if(this.flyingSaucer && this.flyingSaucer.detectCollision(playerBulletManager.getBullet(k))){
				console.log("WELCOME TO EARF!");	//Put sound into class itself.
				gameManager.updateScore(this.flyingSaucer.score);
				this.flyingSaucer = null;
				playerBulletManager.remove(k);
				return;	//No player bullets exist anymore.
			}
			//Check Aliens.
			for(var i = 0; i < this.aliens.size(); i++){
				for(var j = 0; j < this.aliens.get(i).size(); j++){
					if(this.aliens.get(i).get(j).detectCollision(playerBulletManager.getBullet(k))){
						gameManager.updateScore(this.aliens.get(i).get(j).score);
						this.aliens.get(i).remove(j);
						playerBulletManager.remove(k);
						return;	//No player bullet exists, so exit function.
					}
				}
			}
		}
	}
	
	//Orchestration function for calling regular alienManager functions. INCLUDE CHANGE SPRITES IN CLASSES!
	this.manage = function(playerBulletManager, alienBulletManager){
		//When game is not paused.
		if(!this.alienPause){
			//Every 60 second update alien sprites and move main alien pack.
			if(frameCount % 60 === 0 && frameCount != 0){
				this.changeSprite();
				this.alienControl();
			}
			//Shoot when it's targetFrame.
			if(frameCount === this.targetFrame && !this.aliens.isEmpty()){
				alienBulletManager.add(this.shoot());
			}
			//If saucer is up, move it. If it goes out of bounds, remove it.
			if(this.flyingSaucer){
				if(this.flyingSaucer.move()){
					this.flyingSaucer = null;
				} 
			} else if(frameCount === this.saucerFrame){ //if no saucer and it's saucer frame, spawn one.
				this.spawnSaucer();
			}

		} else{ //Prevents special frames from falling behind current frame when paused.
			this.targetFrame++;	
			this.saucerFrame++;
		}
		//If a players bullet is in play, see if it hits anything.
		if(!playerBulletManager.isEmpty()){
			this.detectCollisions(playerBulletManager);
		}
		//Draw updated state to the screen.
		this.display();
	}
	
	//Changes sprite. TODO: Gotta be a cleaner way to do this update. REFACTOR INTO CLASSES THEMSELVES, JUST CALL HERE/IN MANAGE.
	//Sprite is inside prototype, so only want to grab 1 and change it.
	//Don't want to just hardcode enemy references, keep it loosely coupled.
	AlienManager.prototype.changeSprite = function(){
		for(var i = 0; i < 5; i = i + 2){
			var alien = this.aliens.get(i).get(0);
			if(i != 4){	//Only 1 row of Alien3's.
				alien = alien == undefined ? this.aliens.get(i + 1).get(0) : alien;
			}
			if(alien){
				var spriteArr = alien.constructor.prototype.sprites;
				alien.constructor.prototype.sprite = alien.constructor.prototype.sprite === spriteArr[0] ? spriteArr[1] : spriteArr[0];
				i = i == 4 ? 3 : i;
			}
		}
		if(this.flyingSaucer){
			var spriteArr = this.flyingSaucer.sprites;
			this.flyingSaucer.sprite = this.flyingSaucer.sprite == spriteArr[0] ? spriteArr[1] : spriteArr[0];
		}
	}

	//Sets the next frame to shoot on and tells a random alien to fire.
	this.shoot = function(){
		this.targetFrame = frameCount + Math.floor(Math.random() * 150 + 1);
		var shootingAlien;
		while(shootingAlien === undefined){
			var shootingAlienRow = Math.floor(Math.random() * this.aliens.size());
			var shootingAlienColumn = Math.floor(Math.random() * this.aliens.get(shootingAlienRow).size());
			shootingAlien = this.aliens.get(shootingAlienRow).get(shootingAlienColumn);
		}
		return shootingAlien.shoot();
	}
	
	//Spawns a new FlyingSaucer with a random direction.
	this.spawnSaucer = function(){
		var xPos = Math.random() >= 0.5 ? width : 0;
		this.flyingSaucer = new FlyingSaucer(xPos, 25);
		this.saucerFrame = Math.floor(Math.random() * 5000 + frameCount);
	}
	
	//Returns the total number of alien rows, including empty rows.
	this.size = function(){
		return this.aliens.size();
	}
	
	//Returns true if there are no aliens.
	this.isEmpty = function(){
		var emptyRows = 0;
		for(var i = 0; i < this.aliens.size(); i++){
			if(this.aliens.get(i).isEmpty()){
				emptyRows++;
			}
		}
		if(emptyRows === this.aliens.size()){
			return true;
		}
		return false;
	}
	
	//returns the alien row at the given index
	this.get = function(index){
		return this.aliens.get(index);
	}

	//Resets the aliens for a new level.
	this.reloadLevel = function(){
		this.aliens = new List();
		this.createAliens();
	}
	
	//Checks if any aliens have gone below a threshold level to trigger a loss. TODO: Check only lowest row. Use isEmpty.
	this.aliensLanded = function(){
		for(var i = 0; i < this.aliens.size(); i++){
			for(var j = 0; j < this.get(i).size(); j++){
				if(this.get(i).get(j).y >= 400){
					return true;
				}
			}
		}
		return false;
	}
	
	//Sets whether aliens are moving and shooting or not.
	this.setPause = function(pause){
		this.alienPause = pause; 
	}
}