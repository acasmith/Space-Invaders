/*
TODO
	Move pause() from gameManager to UI.
	
*/

function GameManager(){
	this.score;
	this.lives;
	this.playing;	//Tracks whether in menu or in gameplay
	this.paused;	//Tracks whether gamplay is currently pause. Do not confuse with pause()!
	this.isFirefox = typeof InstallTrigger !== 'undefined'; //Playing repeated sound results in memory leak in FF. Much research, still unsure why.
	
	//this.gameState = new gameStateManager();
	this.gameObjects = new gameObjects(this);
	this.uiObjects = new uiObjects(this);
	this.controls = new controlManager(this);
	
	this.startGame = function(){
		this.playing = false;
		this.paused = false;
		this.uiObjects.startGame();
	}
	
	//Provides setup for playing the game.
	this.startPlaying = function(){
		this.playing = true;
		this.score = 0;
		this.lives = 3;
		
		this.gameObjects.startPlaying();
		this.uiObjects.startPlaying();
	}
	
	//Resets the aliens and clears all active bullets.
	this.reloadLevel = function(){
		this.lives += 1;
		this.gameObjects.reloadLevel();
	}
	
	this.isPlaying = function(){
		return this.playing;
	}
	
	this.isPaused = function(){
		return this.paused;
	}
	
	this.setPaused = function(status){
		this.paused = status;
	}
	
	this.isPlayerDead = function(){
		return this.gameObjects.isPlayerDead();
	}
	
	this.getScore = function(){
		return this.score;
	}
	
	this.getLives = function(){
		return this.lives;
	}
	
	//Invokes all the functions necessary for each draw cycle.
	this.manage = function(){
		this.uiObjects.manage();
		
		if(this.playing){
			this.gameObjects.manage();
			this.controls.manage();
			
			this.checkGameStatus();
			
			if(this.paused){
				this.pause();
			}
		}
	}
	
	//Checks the win/loss status on the game.
	this.checkGameStatus = function(){
		if(this.lives === 0 || this.gameObjects.isLoss()){
			this.gameOver();
		}
		else if(this.gameObjects.isLevelCleared()){
			this.reloadLevel();
		}
	}
	
	//Changes the game state to menu mode and displays the gameOver screen.
	this.gameOver = function(){
		this.playing = false;
		this.uiObjects.gameOver();
	}
	
	//updates score by the argument given.
	this.updateScore = function(additionalPoints){
		this.score += additionalPoints;
	}
	
	//updates lives by argument given.
	this.updateLives = function(additionalLives){
		this.lives += additionalLives;
	}
	
	//Pauses alien activity and updates lives.
	//Resets shooter and alienActivity after 2.5 seconds.
	this.playerDeath = function(){
		this.updateLives(-1);
	}
	
	//TODO: Add to UI, change call to reference UI.
	this.pause = function(){
		background(0);
		textAlign(CENTER);
		text("PAUSED", width/2, height/2);
	}
	
	this.playerMove = function(direction){
		this.gameObjects.playerMove(direction);
	}
	
	this.playerShoot = function(){
		this.gameObjects.playerShoot();
		
	}
	
	this.changeMenuSelection = function(direction){
		this.uiObjects.changeSelection(direction);
	}
	
	this.menuSelect = function(){
		this.uiObjects.select();
	}
	
	//Must be part of IIFE return objects interface.
	this.keyPressed = function(){
		this.controls.keyPressed();
	}
	
	//Must be part of IIFE return objects interface.
	this.keyReleased = function(){
		this.controls.keyReleased();
	}

}

//p5 requires a global handler for keyPressed events.
//Used for additional controls reliant on keyPressed event.
function keyPressed(){
	gameManager.keyPressed();
}

//p5 requires a global handler for keyReleased events.
//Used for additional controls reliant on keyReleased event.
function keyReleased(){
	gameManager.keyReleased();
}

	