function Shield(x, y){
	this.sprite = Object.create(Shield.prototype.sprite);
	this.x = x;
	this.y = y;
	this.topEdge = [];
	this.bottomEdge = [];
}

Shield.prototype.preload = function(){
	Shield.prototype.sprite = loadImage("images/shield.png");
}

Shield.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}
//Detect hits - alien AND player.
//Take damage - random amount in all 4 directions.