//TODO
////fillBottom()
////Player bullet detection switched to bottom.
////alien bullet detection along top.
////Remove bullet.
////Finish onHit().
function Shield(x, y){
	this.sprite = Object.create(Shield.prototype.sprite);
	this.x = x;
	this.y = y;
	this.bottomEdge = [];
}

//Preloads images and sounds for shield objects.
Shield.prototype.preload = function(){
	Shield.prototype.sprite = loadImage("images/shield.png");
}

//Organises necessary pre-game setup functionalities for shield objects.
Shield.prototype.setup = function(){
	Shield.prototype.topEdge = Shield.prototype.fillTop();
	Shield.prototype.colorEdge();
}

//Displays the shields sprite.
Shield.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}

//Detects collisions between player bullets and the shield. //Refactor and pass bullet details as args, return true if hit.
//Bullet moves in steps of -10, that's why certain pixels are detecting collision on the y axis.
//Hit detection therefore can occur before or after bullet passes pixel. I've opted to go for before (within a turns move)
//so it always picks up only the first collision, not multiple collisions when the bullet over shoots.
Shield.prototype.detectCollision = function(playerBulletManager){
	//Check top.
	console.log("*************New Shield****************");
	for(var i = 0; i < this.topEdge.length; i++){
		//find coord of pixel from index in pixArr.
		var pixX = this.x + (this.topEdge[i] / 4) % this.sprite.width;
		var pixY = this.y + Math.floor((this.topEdge[i] / 4) / this.sprite.width);
		var bullet = playerBulletManager.getBullet(0);
		
		
		if(bullet &&
			(bullet.x - pixX >= -(0.5 + bullet.width) && bullet.x - pixX < 0.5) &&	//x detection rounds up when pixels are fractional.
			(bullet.y - pixY <= 10)){
				console.log("It's a hit!");
				console.log("pixX: " + pixX + ", pixY" + pixY);
				console.log("bullet.x: " + bullet.x + ", bullet.y" + bullet.y);
				bullet.color = "red";
				bullet.display();
				noLoop();
			
		}
		//Compare against coords of player bullet.
	}
	//Check bottom.
}

Shield.prototype.onHit = function(){};

//Detects top edge of sprite, writes each pixels starting index in pixel array to topEdge.
Shield.prototype.fillTop = function(){
	this.sprite.loadPixels();
	var topEdge = [];
	var pixArr = this.sprite.pixels;
	var pixWidth = this.sprite.width;
	for(var i = 0; i < pixWidth; i++){
		for(var j = 0; j < this.sprite.height; j++){
			var currentIndex = (i * 4 ) + (pixWidth * j * 4); //(column) + (row).
			var pixVal = pixArr[currentIndex] + pixArr[currentIndex + 1] + pixArr[currentIndex + 2];
			if(pixVal > 0){
				topEdge[i] = currentIndex;
				break;	//Top found, move on to next column.
			}
		}
	}
	//this.colorEdge();
	return topEdge;
	//If top array is empty
	//Iterate over array
	//Go down rows until first non black element. ().
}

//Iterates over topEdge and changes the pixel color to highlight it.
Shield.prototype.colorEdge = function(){
	this.sprite.loadPixels();
	var pixArr = this.sprite.pixels;
	for(var i = 0; i < this.topEdge.length; i++){
		this.sprite.pixels[this.topEdge[i]] = 255;
		this.sprite.pixels[this.topEdge[i + 1]] = 255;
		this.sprite.pixels[this.topEdge[i + 2]] = 255;
	}
	this.sprite.updatePixels();
}
//Detect hits - alien AND player.
//Take damage - random amount in all 4 directions.