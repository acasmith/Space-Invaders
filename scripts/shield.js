//TODO
//Random damage to shield: Change to calculate random number width, random number height which is blast radius. Then randomise to shape impact.
////alien bullet detection along top.
////Remove bullet.
////Finish onHit().
function Shield(x, y){
	this.sprite = loadImage("images/shield.png");
	this.x = x;
	this.y = y;
	this.topEdge = Shield.prototype.topEdge;
	this.bottomEdge = Shield.prototype.bottomEdge;
}

//Preloads images and sounds for shield objects.
Shield.prototype.preload = function(){
	Shield.prototype.sprite = loadImage("images/shield.png");
}

//Organises necessary pre-game setup functionalities for shield objects.
Shield.prototype.setup = function(){
	Shield.prototype.topEdge = Shield.prototype.fillTop();
	Shield.prototype.bottomEdge = Shield.prototype.fillBottom();
	//Shield.prototype.colorEdge(Shield.prototype.topEdge);
	//Shield.prototype.colorEdge(Shield.prototype.bottomEdge);
}

//Displays the shields sprite.
Shield.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}

//Detects collisions between player bullets and the shield. //Refactor and pass bullet details as args, return true if hit.
//Bullet moves in steps of -10, that's why certain pixels are detecting collision on the y axis.
//Hit detection therefore can occur before or after bullet passes pixel. I've opted to go for before (within a turns move)
//so it always picks up only the first collision, not multiple collisions when the bullet over shoots.

//FIND GENERAL WAY TO HAVE 1 FUNCTION FOR BOTH PLAYER AND ALIEN BULLETS. Should be it's own function called from here.
Shield.prototype.detectCollision = function(playerBulletManager, alienBulletManager){
	//Check top.
	console.log("*************New Shield****************");
	for(var i = 0; i < this.bottomEdge.length; i++){
		//find coord of pixel from index in pixArr.
		var pixX = this.x + (this.bottomEdge[i] / 4) % this.sprite.width;
		var pixY = this.y + Math.floor((this.bottomEdge[i] / 4) / this.sprite.width);
		var bullet = playerBulletManager.getBullet(0);
		//Find differences in values
		var xDiff = pixX - bullet.x;
		var yDiff = bullet.y - pixY;
		//Check for collision.
		if(xDiff >= 0 && xDiff <= 0.5 + bullet.width){
			console.log("x's aligned!");
			if(yDiff >= 0 && yDiff <= 0.5 + bullet.speed){
				console.log("Hit!");
				this.onHit(i, 0, 0, 0.2);
				return true;
			}
		}
	}
	//noLoop();
	//Check bottom.
}

//Deals with collision behaviour.
//Destroys the original pixel that is hit.
//For all pixels surrounding the orignal, a roll is made to see if that is also destroyed.
//If so, this process if called recursively, but with a reduced chance for adjacent pixel destruction.
Shield.prototype.onHit = function(originalPixel, addX, addY, threshold){
	for(var i = -1; i < 2; i++){
		for(var j = -3; j < 4; j++){
			if(i == 0 && j == 0){
				this.destroyPixel(originalPixel, addX, addY);
			} else{
				if(Math.random() > threshold){
					this.onHit(originalPixel, addX + i, addY + j, threshold / 0.2);
				}
			}
		}
	}
	this.topEdge = this.fillTop();
	this.bottomEdge = this.fillBottom();
	this.colorEdge(this.topEdge);
	this.colorEdge(this.bottomEdge);
};

//Sets the pixel to black, indicating destruction. It will not be included in future hit detections.
Shield.prototype.destroyPixel = function(i, addX, addY){
	this.sprite.loadPixels();
	var additionalPixels = (addX * 4) + (addY * this.sprite.width * 4);
	this.sprite.pixels[this.bottomEdge[i] + additionalPixels] = 0;
	this.sprite.pixels[this.bottomEdge[i] + additionalPixels + 1] = 0;
	this.sprite.pixels[this.bottomEdge[i] + additionalPixels + 2] = 0;
	this.sprite.updatePixels();
}

//Detects top edge of sprite, writes each pixels starting index in pixel array to an array.
//Returns the array containing top edge pixel indeces.
Shield.prototype.fillTop = function(){
	this.sprite.loadPixels();
	var topEdge = [];
	var pixArr = this.sprite.pixels;
	var pixWidth = this.sprite.width;
	var pixHeight = this.sprite.height;
	//Iterate over pixel array
	//Go down rows until first non black element.
	for(var i = 0; i < pixWidth; i++){
		for(var j = 0; j < pixHeight; j++){
			var currentIndex = (i * 4 ) + (pixWidth * j * 4); //(column) + (row).
			var pixVal = pixArr[currentIndex] + pixArr[currentIndex + 1] + pixArr[currentIndex + 2];
			if(pixVal > 0){
				topEdge[i] = currentIndex;
				break;	//Edge found, move on to next column.
			}
		}
	}
	return topEdge;
}

//Detects bottom edge of sprite, writes each pixel starting index from pixel array to an array.
//Returns the array containing the bottom edge pixel indeces.
//TODO: Duplicate code to fillTop except for reversing the loop. Way to refactor to reduce duplication?
Shield.prototype.fillBottom = function(){
	this.sprite.loadPixels();
	var bottomEdge = [];
	var pixArr = this.sprite.pixels;
	var pixWidth = this.sprite.width;
	var pixHeight = this.sprite.height;
	//Iterate over pixel array
	//Go up rows until first non black element.
	for(var i = pixWidth; i >= 0; i--){
		for(var j = pixHeight; j > 0; j--){
			var currentIndex = (i * 4 ) + (pixWidth * j * 4); //(column) + (row).
			var pixVal = pixArr[currentIndex] + pixArr[currentIndex + 1] + pixArr[currentIndex + 2];
			if(pixVal > 0){
				bottomEdge[i] = currentIndex;
				break;	//Edge found, move on to next column.
			}
		}
	}
	return bottomEdge;
}

//Iterates over topEdge and changes the pixel color to highlight it.
Shield.prototype.colorEdge = function(edgeArr){
	this.sprite.loadPixels();
	var pixArr = this.sprite.pixels;
	for(var i = 0; i < edgeArr.length; i++){
		this.sprite.pixels[edgeArr[i]] = 255;
		this.sprite.pixels[edgeArr[i + 1]] = 255;
		this.sprite.pixels[edgeArr[i + 2]] = 255;
	}
	this.sprite.updatePixels();
}
//Detect hits - alien AND player.
//Take damage - random amount in all 4 directions.