function UI(){

}

UI.prototype.display = function(score, lives){
		fill(255);
		textAlign(LEFT);
		text("Score: " + score, 10, 20);
		text("Lives: " + lives, 80, 20);
		text("MouseX: " + mouseX, 140, 20);
		text("MouseY: " + mouseY, 240, 20);
}