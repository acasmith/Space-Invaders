function Alien3(x, y){
	this.x = x + ((Object.getPrototypeOf(Alien3.prototype).width - Alien3.prototype.width) / 2);
	this.y = y;
}

//Changes the prototype to a copy of Alien.prototype.
//This is called from preload to allow the graphics to be loaded ahead of time.
Alien3.prototype.preload = function(){
	Alien3.prototype = Object.create(Alien.prototype);
	Alien3.prototype.sprites = [loadImage("images/alien3.png"), loadImage("images/alien3.5.png")];
	//Adds Alien3 specific values to the prototype.
	Alien3.prototype.setup = function(){
		Alien3.prototype.constructor = Alien3;
		Alien3.prototype.sprite = Alien3.prototype.sprites[0];
		Alien3.prototype.width = Alien3.prototype.sprite.width;
		Alien3.prototype.height = Alien3.prototype.sprite.height;
		Alien3.prototype.score = 40;
	}
	
}


