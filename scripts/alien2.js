//Inherits from Alien.
function Alien2(x, y){
	this.x = x;
	this.y = y;
}

//Changes the prototype to a copy of Alien.prototype.
//This is called from preload to allow the graphics to be loaded ahead of time.
Alien2.prototype.preload = function(){
	Alien2.prototype = Object.create(Alien.prototype);
	Alien2.prototype.sprites = [loadImage("images/alien2.png"), loadImage("images/alien2.5.png")];
	//Adds Alien2 specific values to the prototype.
	Alien2.prototype.setup = function(){
		Alien2.prototype.constructor = Alien2;
		Alien2.prototype.sprite = Alien2.prototype.sprites[0];
		Alien2.prototype.width = Alien2.prototype.sprite.width;
		Alien2.prototype.height = Alien2.prototype.sprite.height;
		Alien2.prototype.score = 20;	
	}
}

