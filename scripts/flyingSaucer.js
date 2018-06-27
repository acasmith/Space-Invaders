//Add WELCOME TO ERFF sound on death.
function FlyingSaucer(x, y){
	if(x === 0){
		this.x = x - this.width;
		this.direction = true;
	} else{
		this.x = x;
		this.direction = false;
	}
	this.y = y;
	
}

//Loads the sprites and sounds for FlyingSaucer.
FlyingSaucer.prototype.preload = function(){
	FlyingSaucer.prototype.sprites = [loadImage("images/flying-saucer.png"), loadImage("images/flying-saucer2.png")];
	//EXACTLY THE SAME AS ALIEN
	FlyingSaucer.prototype.killedSound = loadSound("sounds/invaderkilled.wav");
	FlyingSaucer.prototype.killedSound.setVolume(0.1);
}

//Adds necessary elements to FlyingSaucer prototype.
FlyingSaucer.prototype.setup = function(){
	FlyingSaucer.prototype.sprite = FlyingSaucer.prototype.sprites[0];
	FlyingSaucer.prototype.width = FlyingSaucer.prototype.sprite.width;
	FlyingSaucer.prototype.height = FlyingSaucer.prototype.sprite.height;
	FlyingSaucer.prototype.score = 50;
}

//Only thing same as other Aliens.
FlyingSaucer.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}

//Moves saucer. Returns true if the alien is out of bounds, else false. Different to Alien.
FlyingSaucer.prototype.move = function(){
	this.x = this.direction ? this.x + 3 : this.x - 3;
	if(this.outOfBounds()){
		return true;
	}
	return false;
}

//Checks whether the saucer is out of bounds. Different to Alien.
FlyingSaucer.prototype.outOfBounds = function(){
	if((this.direction && this.x >= width) || (!this.direction && this.x <= -this.width)){
		return true;
	}
	return false;
}

//EXACTLY THE SAME FUNCTION AS IN ALIEN.
FlyingSaucer.prototype.detectCollision = function(bullet){
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

//display (y)
//move (y)
//detectCollisions. (y)
//direction. (y)
//Change sprite. (y)
//Out of bounds (y)
//Random spawn, random direction. (y)
