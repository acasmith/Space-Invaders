//Constructor function
function Alien(x, y){
	this.x = x;
	this.y = y;
}

//Used to preload sprites and sounds. 
//Adds a setup function that relies on those assets being loaded, hence being called in setup.
Alien.prototype.preload = function(){
	Alien.prototype.killedSound = loadSound("sounds/invaderkilled.wav");
	Alien.prototype.killedSound.setVolume(0.1);
	Alien.prototype.sprites = [loadImage("images/alien1.png"), loadImage("images/alien1.5.png")];	
	//Adds Alien specific values to the prototype.
	Alien.prototype.setup = function(){
		Alien.prototype.sprite = Alien.prototype.sprites[0];
		Alien.prototype.width = Alien.prototype.sprite.width;
		Alien.prototype.height = Alien.prototype.sprite.height;
		Alien.prototype.score = 10;
		Alien.prototype.bulletColor = 255;
		Alien.prototype.direction = false;
	}
}

/********Inherited Functions**********/

//Displays the alien on the canvas.
Alien.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}

//Moves the alien either left or right depending on the value of this.direction.
//Returns true when the alien moves out of bounds.
Alien.prototype.move = function(){
	this.x = this.direction ? this.x - 10: this.x + 10;
	return this.isOutOfBounds();
}

//Moves the alien down and in the opposite x direction.
Alien.prototype.reset = function(){
	this.y += this.height;
	this.x = this.direction ? this.x - 17.5 : this.x + 17.5;
}

//Returns true if the argument is within the aliens hitbox, otheriwse false.
Alien.prototype.detectCollision = function(bullet){
	var xDistance = this.x - bullet.x;
	var yDistance = this.y - bullet.y;
	if((xDistance <= Bullet.prototype.width && xDistance + this.width >= 0) && 
		(yDistance <= 0 && yDistance + this.height >= 0)){
		if(!gameManager.isFirefox){
			this.killedSound.play();	
		}
		return true;
	}
	return false;
}

//Alien fires a missle.
Alien.prototype.shoot = function(){
	return new Bullet(this.x + (this.width / 2), this.y + (this.height / 2), this.bulletColor);
}

//Detects if the alien is out of bounds.
Alien.prototype.isOutOfBounds = function(){
	if(this.x <= 0 || this.x > width - this.width){
		return true;
	}
	return false;
}

/*********End inherited functions*******/
