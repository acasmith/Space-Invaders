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
	Shield.prototype.colorEdge()
}

//Displays the shields sprite.
Shield.prototype.display = function(){
	image(this.sprite, this.x, this.y);
}

//Detects collisions between player bullets and the shield. //Refactor and pass bullet details as args, return true if hit.
Shield.prototype.detectCollision = function(playerBulletManager){
	//Check top.
	console.log("*************New Shield****************");
	for(var i = 0; i < this.topEdge.length; i++){
		//find coord of pixel from index in pixArr.
		var pixX = this.x + (this.topEdge[i] / 4) % this.sprite.width;
		var pixY = this.y + Math.floor((this.topEdge[i] / 4) / this.sprite.width);
		var bullet = playerBulletManager.getBullet(0);
		/*this.sprite.pixels[this.topEdge[i]] = 255;
		this.sprite.pixels[this.topEdge[i] + 1] = 0;
		this.sprite.pixels[this.topEdge[i] + 2] = 0;*/
		//ellipse(pixX, pixY, 1, 1);
		//this.sprite.updatePixels();
		/*console.log("pixX: " + pixX + ", pixY" + pixY);
		console.log("bullet.x: " + bullet.x + ", bullet.y" + bullet.y);
		noLoop();
		return;*/
		/*var xDiff = bullet.x - pixX;
		var yDiff = bullet.y - pixY;
		*/
		//Check rounds up to give player 0.5px benefit.
		//Ie. if bullet.x === 0.5 and shield pixel === 0, this will not hit.
		/*if(bullet.x - pixX >= -0.5 && bullet.x - pixX < 0.5){
			console.log("!!!!!!!!!!!!!!!!!!x's equal!!!!!!!!!!!!");
			console.log("////////pixel//////");
			console.log("pixX: " + pixX + ", pixY" + pixY);
			console.log("bullet.x: " + bullet.x + ", bullet.y" + bullet.y);
		}*/
		
		if(bullet.y - pixY === 0){
			console.log("!!!!!!!!!!!!!!!y's equal!!!!!!!!!!!!!!!");
			bullet.color = "red";
			bullet.display();
			noLoop();
		}
		/*if(bullet &&
			(bullet.x - pixX >= -0.5 && bullet.x - pixX < 0.5) &&
			(bullet.y - pixY >= -0.5 && bullet.y - pixY < 0.5)){
				console.log("It's a hit!");
				console.log("pixX: " + pixX + ", pixY" + pixY);
				console.log("bullet.x: " + bullet.x + ", bullet.y" + bullet.y);
				bullet.color = "red";
				bullet.display();
				noLoop();
			
		}*/
		/*if(bullet &&
			(bullet.x - pixX >= 0 && bullet.x - pixX <= bullet.width) && 
			pixY - bullet.y >= 0 && pixY - bullet.y <= bullet.length){
			console.log("It's a hit!");
		}*/
		//Compare against coords of player bullet.
	}
	//noLoop();
	//Check bottom.
}

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