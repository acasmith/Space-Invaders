function Shooter(gameObjects){
	this.sprite = Shooter.prototype.sprites.alive;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.x = width/2;
	this.y = height - this.height;
	this.bulletColor = "#39ff14";
	this.dead = false;
	this.gameObjects = gameObjects;
}

//Displays the sprite.
Shooter.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}

//If the function is at canvas edge and trying to move further, return.
//Else move 5px left or right based on the argument.
Shooter.prototype.move = function(left){
	if((this.x <= 0 && left) || (this.x >= width - this.width && !left)){
		return;
	}
	this.x = left ? this.x - 5 : this.x + 5;
	
}

Shooter.prototype.fire = function(){
	if(!gameManager.isFirefox){
		Shooter.prototype.shootSound.play();
	}
}

//TODO: Refactor collision detection into single class for all instances.
//Detects is the player intersects with an alien bullet.
//NOTE: Current hitbox does not include barrel.
Shooter.prototype.detectCollisions = function(){
	var alienBulletManager = this.gameObjects.alienBulletManager;
	for(var i = 0; i < alienBulletManager.size(); i++){
		var xDistance = alienBulletManager.getBullet(i).x - this.x;
		var yDistance = alienBulletManager.getBullet(i).y - this.y;
		if((xDistance >= 0 && xDistance <= this.width) && yDistance >= 0){
			alienBulletManager.remove(i);
			return true;
		}
	}
	return false;
}

//Organises operations when the player dies.
Shooter.prototype.death = function(){
	this.dead = true;
	this.sprite = Shooter.prototype.sprites.dead;
	if(!gameManager.isFirefox){
		this.deathSound.play();
	}
	this.gameObjects.playerDeath();
}

//Orchestration function for regular shooter activities.
Shooter.prototype.manage = function(){
	if(!this.dead && this.detectCollisions()){
		this.death();
	}
	this.display();
}

Shooter.prototype.isDead = function(){
	return this.dead;
}

Shooter.prototype.getX = function(){
	return this.x;
}

Shooter.prototype.getY = function(){
	return this.y;
}

Shooter.prototype.getWidth = function(){
	return this.width;
}

Shooter.prototype.getBulletColor = function(){
	return this.bulletColor;
}

Shooter.prototype.getBulletInfo = function(){
	var bulletInfo = {};
	bulletInfo.x = this.getX();
	bulletInfo.y = this.getY();
	bulletInfo.bulletColor = this.getBulletColor();
	bulletInfo.width = this.getWidth();
	return bulletInfo;
}

Shooter.prototype.preload = function(){
	Shooter.prototype.sprites = {alive: loadImage("images/shooter.png"), dead: loadImage("images/deadShooter.png")};
	Shooter.prototype.shootSound = loadSound("sounds/shoot.wav");
	Shooter.prototype.deathSound = loadSound("sounds/playerKilled.wav");
}

Shooter.prototype.setup = function(){
	Shooter.prototype.shootSound.setVolume(0.1);
	Shooter.prototype.deathSound.setVolume(0.2);
}