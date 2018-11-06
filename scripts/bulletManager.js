//This class is overkill due to changing how shooting works (particularly for the player) and could be managed within those classes. 
//However it still meets the needs so I'll leave it.
function BulletManager(direction){
	this.direction = direction;
	this.bulletList = new List();
	
	//Calls update() and display() on each bullet object in bulletList.
	//If the bullet goes out of bounds, it's removed from the array.
	this.manage = function(){
		for(var i = 0; i < this.bulletList.size(); i++){
			this.bulletList.get(i).update(this.direction);
			if(this.bulletList.get(i).isOutOfBounds()){
				this.remove(i);
			} else{
				this.bulletList.get(i).display();
			}
		}
	}
	
	//Adds new bullet to bulletList array. 
	this.add = function(playerBullet){
		this.bulletList.add(playerBullet, -1);
	}
	
	BulletManager.prototype.fire = function(bulletInfo){
		var playerBullet = new Bullet(bulletInfo.x + (bulletInfo.width / 2), bulletInfo.y, bulletInfo.bulletColor)
		this.bulletList.add(playerBullet, -1);
	}
	
	//Removes the bullet from the list.
	this.remove = function(bulletIndex){
		this.bulletList.remove(bulletIndex);
	}
	
	//Returns the playerBullet at the given index.
	this.getBullet = function(index){
		return this.bulletList.get(index);
	}
	
	//Returns total number of player playerBulletManager currently on screen.
	this.size = function(){
		return this.bulletList.size();
	}
	
	this.isEmpty = function(){
		return this.bulletList.isEmpty();
	}
	
	this.reloadLevel = function(){
		this.bulletList = new List();
	}
}