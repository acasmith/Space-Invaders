//When shooter is destoryed on death, add all functions to prototype to aid memory management.
function Shooter(){
	this.width = Shooter.prototype.shooterGraphic.width;
	this.height = Shooter.prototype.shooterGraphic.height;
	this.x = width/2;
	this.y = height - this.height;
	this.myColor = 255;
	this.bulletColor = "#39ff14";
	this.bullet;
	Shooter.prototype.shootSound = loadSound("sounds/shoot.wav");
	Shooter.prototype.shootSound.setVolume(0.1);
	
	/*****Inherited functions****/
	
	//Displays the sprite.
	Shooter.prototype.display = function(){
		image(Shooter.prototype.shooterGraphic, this.x, this.y);
	}
	
	//If the function is at canvas edge and trying to move further, return.
	//Else move 5px left or right based on the argument.
	Shooter.prototype.move = function(left){
		if((this.x < 5 && left) || (this.x > width - 55 && !left)){
			return;
		}
		this.x = left ? this.x - 5 : this.x + 5;
		
	}
	
	//Creates a new bullet.
	Shooter.prototype.fire = function(playerBulletManager){
		if(playerBulletManager.isEmpty()){
			playerBulletManager.add(new Bullet(this.x + (this.width / 2) - (Bullet.prototype.width / 2), this.y, this.bulletColor));
			var isFirefox = typeof InstallTrigger !== 'undefined';
			if(!isFirefox){
				Shooter.prototype.shootSound.play();	//Playing repeated sound results in memory leak in FF. Much research, still unsure why.
			}
			
		}
	}
	
	//Detects is the player intersects with an alien bullet.
	//NOTE: Current hitbox does not include barrel.
	Shooter.prototype.detectCollisions = function(alienBulletManager){
		for(var i = 0; i < alienBulletManager.size(); i++){
			var xDistance = alienBulletManager.getBullet(i).x - this.x;
			var yDistance = alienBulletManager.getBullet(i).y - this.y;
			if((xDistance >= 0 && xDistance <= this.width) && yDistance >= 0){
				alienBulletManager.remove(i);
				return true;
			}
		}
	}
	
	//Orchestration function for regular shooter functions.
	Shooter.prototype.manage = function(alienManager, alienBulletManager){
		if(this.detectCollisions(alienBulletManager)){
			gameManager.updateLives(-1);
		}
		this.display();
	}
	
	/*******End inherited functions******/
}	

//Load assets
window.addEventListener("load", addToPrototype);
function addToPrototype(){
	Shooter.prototype.shooterGraphic = loadImage("images/shooter.png");

}