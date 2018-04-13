//Constructor
function Bullet(x, y, color){
	this.x = x;
	this.y = y;
	this.color = color;
}

/******Inherited Functions*********/

//Displays the bullet.
Bullet.prototype.display = function(){
	fill(this.color);
	rect(this.x, this.y, 5, 10);
}

//Updates y position, with the argument providing the direction (1 goes up, -1 goes down).
//Returns true if the bullets origin has passed the top or bottom of the screen.
Bullet.prototype.update = function(direction){
	this.y -= 10 * direction;
	if(this.y < 0 || this.y > height){
		return true;
	}
	return false;
}
/******End Inherited Functions*********/