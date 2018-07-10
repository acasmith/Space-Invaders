function gameStateManager(gameManager){
	this.gameManager = gameManager;
	this.score;
	this.lives;
	this.playing;	//Tracks whether in menu or in gameplay
	this.paused;	//Tracks whether gamplay is currently paused. Do not confuse with pause()!
	
	this.startGame = function(){
		this.playing = false;
		this.paused = false;
	}
	
	this.startPlaying = function(){
		this.score = 0;
		this.lives = 3;
		this.playing = true;
	}
	
	//Checks the win/loss status on the game.
	this.checkGameStatus = function(){
		if(this.getLives() === 0 || this.gameManager.isLoss()){
			this.gameManager.gameOver();
		}
		else if(this.gameManager.isLevelCleared()){
			this.gameManager.reloadLevel();
		}
	}
	
	this.reloadLevel = function(){
		this.lives += 1;
	}
	
	this.gameOver = function(){
		this.playing = false;
	}
	
	//***************************Getters and setters****************************
	this.getScore = function(){
		return this.score;
	}
	
	this.updateScore = function(additionalPoints){
		this.score += additionalPoints;
	}
	
	this.getLives = function(){
		return this.lives;
	}
	
	this.updateLives = function(additionalLives){
		this.lives += additionalLives;
	}
	
	this.isPlaying = function(){
		return this.playing;
	}
	
	this.setPlaying = function(status){
		this.playing = status;
	}
	
	this.isPaused = function(){
		return this.paused;
	}
	
	this.setPaused = function(status){
		this.paused = status;
	}
}