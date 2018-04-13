//When shooter is destoryed on death, add all functions to prototype to aid memory management.
function Shooter(){
	this.x = width/2;
	this.y = height - 15;
	this.myColor = 255;
	this.bulletColor = 255;
	this.currentTimeout;
	this.bullet;
	this.shootSound = loadSound("sounds/shoot.wav");
	this.shootSound.setVolume(0.1);
	
	//Displays the object.
	this.display = function(){
		fill(this.myColor);
		stroke(this.myColor);
		rect(this.x + 20, this.y - 8, 10, 20); //barrel
		rect(this.x, this.y, 50, 15);	//turret
		stroke(0);
	}
	
	//If the function is at canvas edge and trying to move further, return.
	//Else move 5px left or right based on the argument.
	this.move = function(left){
		if((this.x < 5 && left) || (this.x > width - 55 && !left)){
			return;
		}
		this.x = left ? this.x - 5 : this.x + 5;
		
	}
	
	//Creates a new bullet.
	this.fire = function(playerBulletManager){
		if(playerBulletManager.isEmpty()){
			playerBulletManager.add(new Bullet(this.x + 22.5, this.y - 8, this.bulletColor));
			this.shootSound.play();
		}
	}
	
	//Detects is the player intersects with an alien bullet.
	//NOTE: Current hitbox does not include barrel.
	this.detectCollisions = function(alienBulletManager){
		for(var i = 0; i < alienBulletManager.size(); i++){
			var xDistance = alienBulletManager.getBullet(i).x - this.x;
			var yDistance = alienBulletManager.getBullet(i).y - this.y;
			if(xDistance >= 0 && xDistance <= 60 && yDistance >= 0 && yDistance <= 15){
				clearTimeout(this.currentTimeout);
				this.myColor = "red";
				var self = this;
				this.currentTimeout = setTimeout(function(){self.myColor = 255;}, 300);
				alienBulletManager.remove(i);
				return true;
			}
		}
	}
	
	//Orchestration function for regular shooter functions.
	this.manage = function(alienManager, alienBulletManager){
		if(this.detectCollisions(alienBulletManager)){
			gameManager.updateLives(-1);
		}
		this.display();
	}
}