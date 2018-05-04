//TODO
////fillBottom()
////Player bullet detection switched to bottom. Ensure actual pixel hit has lowest y value.
////alien bullet detection along top.
////Remove bullet.
////Finish onHit().
function Shield(x, y){
	this.sprite = Object.create(Shield.prototype.sprite);
	this.x = x;
	this.y = y;
}

//Preloads images and sounds for shield objects.
Shield.prototype.preload = function(){
	Shield.prototype.sprite = loadImage("images/shield.png");
}

//Organises necessary pre-game setup functionalities for shield objects.
Shield.prototype.setup = function(){
	Shield.prototype.topEdge = Shield.prototype.fillTop();
	Shield.prototype.bottomEdge = Shield.prototype.fillBottom();
	Shield.prototype.colorEdge(Shield.prototype.topEdge);
	Shield.prototype.colorEdge(Shield.prototype.bottomEdge);
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