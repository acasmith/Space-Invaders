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

FlyingSaucer.prototype.preload = function(){
	FlyingSaucer.prototype.sprites = [loadImage("images/flying-saucer.png"), loadImage("images/flying-saucer2.png")];
}

FlyingSaucer.prototype.setup = function(){
	FlyingSaucer.prototype.sprite = FlyingSaucer.prototype.sprites[0];
	FlyingSaucer.prototype.width = FlyingSaucer.prototype.sprite.width;
	FlyingSaucer.prototype.score = 50;
}

//Only thing same as other Aliens.
FlyingSaucer.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}

//Moves saucer. Returns true if the alien is out of bounds, else false.
FlyingSaucer.prototype.move = function(){
	this.x = this.direction ? this.x + 3 : this.x - 3;
	if(this.outOfBounds()){
		return true;
	}
	return false;
}

//Checks whether the saucer is out of bounds.
FlyingSaucer.prototype.outOfBounds = function(){
	if((this.direction && this.x >= width) || (!this.direction && this.x <= -this.width)){
		return true;
	}
	return false;
}

//display (y)
//move (y)
//detectCollisions.
//direction. (y)
//Change sprite. (y)
//Out of bounds (y)
//Random spawn, random direction.
