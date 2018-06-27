//TODO
////alien bullet destruction of TOP of shield.
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
/*Shield.prototype.detectCollision = function(playerBulletManager, alienBulletManager){
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
}*/

//Optimise!
////First check if bullet is anywhere near the shield. If not, skip.
	////Get bullet origin
	////Get shield origin.
	////If shield origin + shield width < bullet.x it misses so skip.
	////If shield origin + bullet.width + 0.5 > bullet.x it misses so skip.
	
//Abstracted version.
Shield.prototype.detectCollision = function(bulletManager, attacker){
	//Get a bullet
	for(var i = 0; i < bulletManager.size(); i++){
		var bullet = bulletManager.getBullet(i);
		//Check bullet is within shield bounds
		if(bullet.x + bullet.width + 0.5 >= this.x && bullet.x - 0.5 < this.x + this.sprite.width){
			var edgeArr = attacker === "alien" ? this.topEdge : this.bottomEdge;
			for(var j = 0; j < edgeArr.length; j++){
				//find coord of pixel from index in pixArr.
				var pixX = this.x + (edgeArr[j] / 4) % this.sprite.width;
				var pixY = this.y + Math.floor((edgeArr[j] / 4) / this.sprite.width);
				//Find differences in values
				var xDiff = pixX - bullet.x;
				var yDiff = bullet.y - pixY;
				//Check for collision.
				if(xDiff >= 0 && xDiff <= 0.5 + bullet.width){
					if(yDiff >= 0 && yDiff <= 0.5 + bullet.speed){
						this.onHit(j, 0, 0, 0.2);
						return i;
					}
				}
			}
		}	
	}
	return -1;
	//noLoop();
	//Check bottom.
}	
	
	


//Abstracted version.
/*Shield.prototype.detectCollision = function(bulletManager, attacker){
	var edgeArr = attacker === "alien" ? this.topEdge : this.bottomEdge;
	for(var i = 0; i < edgeArr.length; i++){
		//find coord of pixel from index in pixArr.
		var pixX = this.x + (edgeArr[i] / 4) % this.sprite.width;
		var pixY = this.y + Math.floor((edgeArr[i] / 4) / this.sprite.width);
		for(var j = 0; j < bulletManager.size(); j++){
			var bullet = bulletManager.getBullet(j);
			//Find differences in values
			var xDiff = pixX - bullet.x;
			var yDiff = bullet.y - pixY;
			//Check for collision.
			if(xDiff >= 0 && xDiff <= 0.5 + bullet.width){
				if(yDiff >= 0 && yDiff <= 0.5 + bullet.speed){
					this.onHit(i, 0, 0, 0.2);
					return j;
				}
			}
		}
	}
	return -1;
	//noLoop();
	//Check bottom.
}*/

//Provides collision behaviour.
//Circular area around collision point is destroyed.
//The circle radius is randomised, with some additional "noise" to prevent perfect circles.
Shield.prototype.onHit = function(originalPixel){
	var blastRadius = Math.floor(Math.random() * 5) + 6;
	var hitPixels = [];
	
	for(var i = blastRadius * -1; i < blastRadius + Math.random() * 5; i++){
		for(var j = blastRadius * -1; j < blastRadius + Math.random() * 5 + 5; j++){
			if(i*i + j*j <= blastRadius*blastRadius &&
				originalPixel + i >= 0 && originalPixel + i < this.sprite.width){
				hitPixels.push(i);
				hitPixels.push(j);
			}
		}
	}
	this.destroyPixel(originalPixel, hitPixels);
	
	//Fill top/bottom arrays for new shield shape.
	this.topEdge = this.fillTop();
	this.bottomEdge = this.fillBottom();
	//this.colorEdge(this.topEdge);
	//this.colorEdge(this.bottomEdge);
};

//Sets the pixel to black, indicating destruction. It will not be included in future hit detections.
Shield.prototype.destroyPixel = function(originalPixel, hitPixels){
	this.sprite.loadPixels();
	for(var i = 0; i < hitPixels.length; i = i + 2){
		var additionalPixels = (hitPixels[i] * 4) - (hitPixels[i + 1] * this.sprite.width * 4);
		this.sprite.pixels[this.bottomEdge[originalPixel] + additionalPixels] = 0;
		this.sprite.pixels[this.bottomEdge[originalPixel] + additionalPixels + 1] = 0;
		this.sprite.pixels[this.bottomEdge[originalPixel] + additionalPixels + 2] = 0;
	}
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
		this.sprite.pixels[edgeArr[i + 2]] = 0;
	}
	this.sprite.updatePixels();
}