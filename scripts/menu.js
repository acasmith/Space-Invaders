//Constructor
function Menu(screen){
	this.currentScreen = screen; //0 for main screen, 1 for controls, 2 for highscores, 3 for gameOver.
	this.currentSelection = 0; //0 for play, 1 for controls, 2 for highscores.
}

/********Inherited Functions********/

//Displays a menu screen based on the current value of this.currentScreen.
Menu.prototype.display = function(){
	switch (this.currentScreen){
		case 0:
			this.mainMenu();
			break;
		case 1:
			this.controlsMenu();
			break;
		case 2:
			this.highScores();
			break;
		case 3:
			this.gameOver();
			break;
		default:
			this.currentScreen = 0;
			break;
	}
}

//Displays the main menu content, current selection is bold yellow.
Menu.prototype.mainMenu = function(){
	var options = ["Play", "Controls", "High Scores"];
	//Placeholder for S-I logo. The image requires hosting on a server due to x-origin blocking.
	stroke("red");
	rect(50, 30, 540, 200);
	this.contentStyle();
	text("Main Menu", width/2, height/4);
	for(var i = 0; i < 3; i++){
		if(i === this.currentSelection){
			this.highlightStyle();
		}
		text(options[i], width/2, height/2 + i * 20);
		this.contentStyle();
	}
}

//Starts a new game.
Menu.prototype.play = function(){
	gameManager.startPlaying();
}

//Sets out the controls menu.
Menu.prototype.controlsMenu = function(){
	this.contentStyle();
	text("Controls", width/2, height/4);
	textAlign(LEFT);
	text("Move: A/D or Left/Right arrows.", width/4, height/3 + 20);
	text("Fire: Space", width/4, height/3 + 50);
	text("Lose all your lives or let the aliens land and it's game over!", width/4, height/3 + 80);
	this.highlightStyle();
	text("Back", width/2, height/2 + 120);
}

//Sets out the highscores menu.
Menu.prototype.highScores = function(){
	this.contentStyle();
	text("High Scores", width/2, height/2);
}

//Sets out the gameOver screen.
Menu.prototype.gameOver = function(){
		this.contentStyle();
		text("GAME OVER", width/2, height/4);
		text("Final score: " + gameManager.score, width/2, height/2);
		this.highlightStyle();
		text("Main Menu", width/2, height /2 + 120);
		
}


//Increments this.currentSelections value by the change argument. 
//The value wraps around after 0 or 3 ie. 0 - 1 = 2.
Menu.prototype.changeSelection = function(change){
	this.currentSelection += change;
	if(this.currentSelection > 2 || this.currentSelection < 0){
		this.currentSelection -= (3 * change);
	}
}

//Sets the current screen to the users selection.
Menu.prototype.select = function(){
	if(this.currentScreen === 0){
		if(this.currentSelection === 0){
			this.play();
		} else{
			this.currentScreen = this.currentSelection;
		}
	} else{
		this.currentScreen = 0;
	}
}

//Utility function to for normal styling.
Menu.prototype.contentStyle = function(){
	fill("255");
	noStroke();
	textAlign(CENTER);
	textStyle(NORMAL);
}

//Utility function for highlight styling.
Menu.prototype.highlightStyle = function(){
	fill("yellow");
	noStroke();
	textAlign(CENTER);
	textStyle(BOLD);
}