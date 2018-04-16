//Constructor function
function Alien(x, y){
	this.x = x;
	this.y = y;
	this.radius = 35/2;
	this.color = "#39ff14";
	this.direction = false;
}

/********Inherited Functions**********/

//Displays the alien on the canvas.
Alien.prototype.display = function(){
	fill(this.color);
	ellipse(this.x, this.y, 35, 35);
}

//Moves the alien either left or right depending on the value of this.direction.
//Returns true when the alien moves out of bounds.
Alien.prototype.move = function(){
	this.x = this.direction ? this.x - 10: this.x + 10;
	if(this.x <= 17.5 || this.x > width - 17.5){
		return true;
	}
	return false;
}

//Moves the alien down and in the opposite x direction.
Alien.prototype.reset = function(){
	this.direction = !this.direction;
	this.y += 35;
	this.x = this.direction ? this.x - 17.5 : this.x + 17.5;
}

//Returns true if the argument is within the aliens radius, otheriwse false.
Alien.prototype.detectCollision = function(bullet){
	var xDistance = Math.abs(this.x - bullet.x);
	var yDistance = Math.abs(this.y - bullet.y);
	if(xDistance <= this.radius && yDistance <= this.radius){
		this.killedSound.play();	//Commented out for chrome testing
		return true;
	}
	return false;
}

//Alien fires a missle.
Alien.prototype.shoot = function(){
	return new Bullet(this.x, this.y, this.color);
}



//Adds sound functions to prototype when page loads otherwise p5.sound is unaccessible.
window.addEventListener("load", addToPrototype);
function addToPrototype(){
	Alien.prototype.killedSound = loadSound("sounds/invaderkilled.wav");
	Alien.prototype.killedSound.setVolume(0.1);
}

/*********End inherited functions*******/