function AlienManager(){
	this.aliens = new List();
	this.targetFrame = Math.floor(Math.random() * 250 + frameCount);
	this.alienPause = false;
	
	//Returns a list containing 6 alien objects.
	this.createRow = function(yVal){
		var row = new List();
		for(var j = 0; j < 11; j++){
			row.add(new Alien(140 + (40 * j), 200 + yVal), j);
		}
		return row;
	}
	
	//Fills this.aliens with 4 rows of aliens.
	this.createAliens = function(){
		for(var i = 0; i < 4; i++){
			this.aliens.add(this.createRow(i * -50), i);
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
	
	//Moves the contents of aliens. If an element goes out of bounds, moves the contents
	//vertically down and resumes moving in the opposite direction.
	//N.B: Refactor this algo, there must be a way to avoid iterating twice on a reset?
	this.alienControl = function(){
		var reset = false;
		for(var i = 0; i < this.aliens.size(); i++){
			for(var j = 0; j < this.aliens.get(i).size(); j++){
				if(this.aliens.get(i).get(j).move()){
					reset = true;
				}
			}
		}
		if(reset){
			for(var i = 0; i < this.aliens.size(); i++){
				for(var j = 0; j < this.aliens.get(i).size(); j++){
					this.aliens.get(i).get(j).reset();
				}
			}
		}
	}
	
	//Iterates over aliens comparing locations with all player bullets.
	//If there is a collision, the alien and the bullet are removed.
	this.detectCollisions = function(playerBulletManager){
		var aliensDestroyed = 0;
		for(var i = 0; i < this.aliens.size(); i++){
			for(var j = 0; j < this.aliens.get(i).size(); j++){
				for(var k = 0; k < playerBulletManager.size(); k++){
					if(this.aliens.get(i).get(j).detectCollision(playerBulletManager.getBullet(k))){
						aliensDestroyed++;
						this.aliens.get(i).remove(j);
						playerBulletManager.remove(k);
						j = Math.max(0, j - 1);	//To adjust for changing indeces from list removal.
						break;	//Current alien (j) no longer exists, so this loop is redundant.
					}
				}
			}
		}
		gameManager.updateScore(aliensDestroyed * 10);
	}
	
	//Orchestration function for calling regular alienManager functions.
	//aliens move every 2 seconds, default framerate is 30hz.
	this.manage = function(playerBulletManager, alienBulletManager){
		if(!this.alienPause){
			if(frameCount % 60 === 0 && frameCount != 0){
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

	//Sets the next frame to shoot on and tells a random alien to fire.
	this.shoot = function(){
		this.targetFrame = frameCount + Math.floor(Math.random() * 150 + 1);
		var shootingAlien;
		while(shootingAlien === undefined){
			var shootingAlienRow = Math.floor(Math.random() * this.aliens.size());
			var shootingAlienColumn = Math.floor(Math.random() * this.aliens.get(shootingAlienRow).size());
			shootingAlien = this.aliens.get(shootingAlienRow).get(shootingAlienColumn);
		}
		//Catches when shootingAlien gets destroyed before it can shoot.
		//Unsuitable for main loop because it results in continuously changing target frame.
		/*if(shootingAlien === undefined){
			console.log("recursive shoot");
			return this.shoot();
		};*/
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
	
	//Checks if any aliens have gone below a threshold level to trigger a loss.
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