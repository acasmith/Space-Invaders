function AlienManager(){
	this.aliens = new List();
	this.targetFrame = Math.floor(Math.random() * 250 + frameCount);
	this.alienPause = false;
	
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
	
	
	
	//Displays the contents of aliens.
	this.display = function(){
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
	
	//Iterates over aliens comparing locations with all player bullets.
	//If there is a collision, the alien and the bullet are removed.
	this.detectCollisions = function(playerBulletManager){
		var points = 0;
		for(var i = 0; i < this.aliens.size(); i++){
			for(var j = 0; j < this.aliens.get(i).size(); j++){
				for(var k = 0; k < playerBulletManager.size(); k++){
					if(this.aliens.get(i).get(j).detectCollision(playerBulletManager.getBullet(k))){
						points += this.aliens.get(i).get(j).score;
						this.aliens.get(i).remove(j);
						playerBulletManager.remove(k);
						j = Math.max(0, j - 1);	//To adjust for changing indeces from list removal.
						break;	//Current alien (j) no longer exists, so this loop is redundant.
					}
				}
			}
		}
		gameManager.updateScore(points);
	}
	
	//Orchestration function for calling regular alienManager functions.
	//aliens move every 2 seconds, default framerate is 30hz.
	this.manage = function(playerBulletManager, alienBulletManager){
		if(!this.alienPause){
			if(frameCount % 60 === 0 && frameCount != 0){
				this.changeSprite();
				this.alienControl();
			}
			if(frameCount === this.targetFrame && !this.aliens.isEmpty()){
				alienBulletManager.add(this.shoot());
			}
		} else{
			this.targetFrame++;	//Prevents target frame from falling behind current frame.
		}
		this.detectCollisions(playerBulletManager);
		this.display();
	}
	
	//Changes sprite. TODO: Gotta be a cleaner way to do this update.
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
				if(this.get(i).get(j).y >= 480){
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