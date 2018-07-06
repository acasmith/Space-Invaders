function UI(){

}

UI.prototype.manage = function(score, lives){
	this.display(score, lives);
}

UI.prototype.display = function(score, lives){
		fill(255);
		textAlign(LEFT);
		text("Score: " + score, 10, 20);
		text("Lives: " + lives, 80, 20);
}