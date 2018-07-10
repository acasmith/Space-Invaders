/*
TODO
	Move game state to gameStateManager.
	Move pause() from gameManager to UI.
	
*/

function GameManager(){
	this.isFirefox = typeof InstallTrigger !== 'undefined'; //Playing repeated sound results in memory leak in FF. Much research, still unsure why.
	
	this.gameState = new gameStateManager(this);
	this.gameObjects = new gameObjects(this);
	this.uiObjects = new uiObjects(this);
	this.controls = new controlManager(this);
	
	//Initialises game.
	this.startGame = function(){
		this.gameState.startGame();
		this.uiObjects.startGame();
	}
	
	//Begins a gameplay session.
	this.startPlaying = function(){
		this.gameState.startPlaying();
		this.gameObjects.startPlaying();
		this.uiObjects.startPlaying();
	}
	
	//Resets the aliens and clears all active bullets.
	this.reloadLevel = function(){
		this.gameState.reloadLevel();
		this.gameObjects.reloadLevel();
	}
	
	//Invokes all the functions necessary for each draw cycle.
	this.manage = function(){
		this.uiObjects.manage();
		
		if(this.isPlaying()){
			this.gameObjects.manage();
			this.controls.manage();
			this.gameState.checkGameStatus();
			
			if(this.isPaused()){
				this.pause();
			}
		}
	}
	
	//Pauses alien activity and updates lives.
	//Resets shooter and alienActivity after 2.5 seconds.
	this.playerDeath = function(){
		this.gameState.updateLives(-1);
	}
	
	//Changes the game state to menu mode and displays the gameOver screen.
	this.gameOver = function(){
		this.gameState.gameOver();
		this.uiObjects.gameOver();
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
	
	//***********Getters and Setters**************
	
	this.isPlaying = function(){
		return this.gameState.isPlaying();
	}
	
	this.isPaused = function(){
		return this.gameState.isPaused();
	}
	
	this.setPaused = function(status){
		this.gameState.setPaused(status);
	}
	
	this.isPlayerDead = function(){
		return this.gameObjects.isPlayerDead();
	}
	
	this.getScore = function(){
		return this.gameState.getScore();
	}
	
	this.getLives = function(){
		return this.gameState.getLives();
	}
	
	this.isLoss = function(){
		return this.gameObjects.isLoss();
	}
	
	this.isLevelCleared = function(){
		return this.gameObjects.isLevelCleared();
	}
	
	this.updateScore = function(additionalPoints){
		this.gameState.updateScore(additionalPoints);
	}
	
	this.updateLives = function(additionalLives){
		this.gameState.updateLives(additionalLives);
	}
	
	//TODO: Add to UI, change call to reference UI.
	this.pause = function(){
		this.uiObjects.pause();
	}

}

//p5 requires a globally scoped handler for keyPressed events.
//Used for additional controls reliant on keyPressed event.
function keyPressed(){
	gameManager.keyPressed();
}

//p5 requires a globally scoped handler for keyReleased events.
//Used for additional controls reliant on keyReleased event.
function keyReleased(){
	gameManager.keyReleased();
}

	