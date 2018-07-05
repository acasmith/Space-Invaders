//Constructor
function Bullet(x, y, color){
	this.x = x;
	this.y = y;
	this.speed = 10;
	this.color = color;
}

/******Inherited Functions*********/
Bullet.prototype.width = 3;
Bullet.prototype.height = 10;

//Displays the bullet.
Bullet.prototype.display = function(){
	fill(this.color);
	rect(this.x, this.y, this.width, this.height);
}

//Updates y position, with the argument providing the direction (1 goes up, -1 goes down).
//Returns true if the bullets origin has passed the top or bottom of the screen.
Bullet.prototype.update = function(direction){
	this.y -= this.speed * direction;
	if(this.y < 0 || this.y > height){
		return true;
	}
	return false;
}
/******End Inherited Functions*********/