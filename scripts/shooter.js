//When shooter is destoryed on death, add all functions to prototype to aid memory management.
function Shooter(){
	this.sprite = Shooter.prototype.sprites.alive;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.x = width/2;
	this.y = height - this.height;
	this.bulletColor = "#39ff14";
	this.dead = false;
}	

/*****Inherited functions****/

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

//Creates a new bullet.
Shooter.prototype.fire = function(playerBulletManager){
	if(!this.dead && playerBulletManager.isEmpty()){
		playerBulletManager.add(new Bullet(this.x + (this.width / 2) - (Bullet.prototype.width / 2), this.y, this.bulletColor));
		if(!gameManager.isFirefox){
			Shooter.prototype.shootSound.play();	
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
	return false;
}

//Organises operations when the player dies.
Shooter.prototype.death = function(){
	this.dead = true;
	this.sprite = Shooter.prototype.sprites.dead;
	if(!gameManager.isFirefox){
		this.deathSound.play();
	}
	gameManager.playerDeath();
}

//Orchestration function for regular shooter activities.
Shooter.prototype.manage = function(alienManager, alienBulletManager){
	if(!this.dead && this.detectCollisions(alienBulletManager)){
		this.death();
	}
	this.display();
}

/*******End inherited functions******/

//Load assets
window.addEventListener("load", addToPrototype);
function addToPrototype(){
	Shooter.prototype.sprites = {alive: loadImage("images/shooter.png"), dead: loadImage("images/deadShooter.png")};
	Shooter.prototype.shootSound = loadSound("sounds/shoot.wav");
	Shooter.prototype.shootSound.setVolume(0.1);
	Shooter.prototype.deathSound = loadSound("sounds/playerKilled.wav");
	Shooter.prototype.deathSound.setVolume(0.2);
}