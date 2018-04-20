//Constructor function
function Alien(x, y){
	this.x = x;
	this.y = y;
	this.width = Alien.prototype.graphic.width;
	this.height = Alien.prototype.graphic.height;
	this.radius = this.width;	//Only used for ellipse collision, not graphic.
	this.color = "#39ff14";
	this.direction = false;
}

/********Inherited Functions**********/

//Displays the alien on the canvas.
Alien.prototype.display = function(){
	//fill(this.color);
	//ellipse(this.x, this.y, 35, 35);
	image(Alien.prototype.graphic, this.x, this.y);
	
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



//Adds sound functions to prototype when page loads otherwise p5.sound is unaccessible.
window.addEventListener("load", addToPrototype);
function addToPrototype(){
	console.log("called");
	Alien.prototype.killedSound = loadSound("sounds/invaderkilled.wav");
	Alien.prototype.killedSound.setVolume(0.1);
	Alien.prototype.graphic = loadImage("images/alien1.png");
}

/*********End inherited functions*******/