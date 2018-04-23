function FlyingSaucer(x, y){
	this.x = x;
	this.y = y;
}

FlyingSaucer.prototype.preload = function(){
	FlyingSaucer.prototype.sprites = [loadImage("images/flying-saucer.png"), loadImage("images/flying-saucer2.png")];
}

FlyingSaucer.prototype.setup = function(){
	//FlyingSaucer
	FlyingSaucer.prototype.score = 50;
}

//display
//move
//detectCollisions.
//direction.
//Change sprite.