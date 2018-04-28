function ShieldManager(){
	this.shields = [];
}

ShieldManager.prototype.createShields = function(){
	//this.shields[0] = new Shield(30, 400);
	for(var i = 0; i < 5; i++){
		//Assigns the total screen width shields can be deployed in. 
		//-Sprite width accounts for length of last sprite cause it's drawn from top left
		//-50 because I want a 25px buffer on either side.
		var setupWidth = width - Shield.prototype.sprite.width - 50;
		//Divide by 4 to get 5 equal divisions. (first one drawn from 0).
		//Change this if number of shields changes.
		setupWidth /= 4;
		//* i to scale x across the range.
		//+25 to push all shields in by 25px for the buffer. Will have 25px spare as the far side buffer.
		this.shields.push(new Shield(setupWidth * i + 25, 400));
	}
}

ShieldManager.prototype.display = function(){
	for(var i = 0; i < this.shields.length; i++){
		this.shields[i].display();
	}
}

//Set fail state for when aliens get to shield y val.