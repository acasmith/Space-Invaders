//Constructor function
function Alien(x, y){
	this.x = x;
	this.y = y;
	this.width = Alien.prototype.graphic0.width;
	this.height = Alien.prototype.graphic0.height;
	this.color = "#39ff14";
	this.direction = false;
	this.animationState = false;
	this.sprite = Alien.prototype.graphic0;
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
	this.changeSprite();
	return this.isOutOfBounds();
}

//Moves the alien down and in the opposite x direction.
Alien.prototype.reset = function(){
	this.direction = !this.direction;
	this.y += this.height;
	this.x = this.direction ? this.x - 17.5 : this.x + 17.5;
}

//Returns true if the argument is within the aliens radius, otheriwse false.
Alien.prototype.detectCollision = function(bullet){
	var xDistance = this.x - bullet.x;
	var yDistance = this.y - bullet.y;
	if((xDistance <= 0 && xDistance + this.width >= 0) && 
		(yDistance <= 0 && yDistance + this.height >= 0)){
	var isFirefox = typeof InstallTrigger !== 'undefined';
		if(!isFirefox){
			Shooter.prototype.shootSound.play();	//Playing repeated sound results in memory leak in FF. Much research, still unsure why.
		}
		return true;
	}
	return false;
}

//Alien fires a missle.
Alien.prototype.shoot = function(){
	return new Bullet(this.x, this.y, this.color);
}

//Changes sprite.
Alien.prototype.changeSprite = function(){
	this.sprite = this.animation ? Alien.prototype.graphic1 : Alien.prototype.graphic0;
	this.animation = !this.animation;
}

//Detects if the alien is out of bounds.
Alien.prototype.isOutOfBounds = function(){
	if(this.x <= 0 || this.x > width - this.width){
		return true;
	}
	return false;
}



//Adds sound functions to prototype when page loads otherwise p5.sound is unaccessible.
window.addEventListener("load", addToPrototype);
function addToPrototype(){
	Alien.prototype.killedSound = loadSound("sounds/invaderkilled.wav");
	Alien.prototype.killedSound.setVolume(0.1);
	Alien.prototype.graphic0 = loadImage("images/alien1.png");
	Alien.prototype.graphic1 = loadImage("images/alien1.5.png");
}

/*********End inherited functions*******/
