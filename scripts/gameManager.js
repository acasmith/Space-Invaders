/*
TODO
	Update playerDeath(), playerControls(), keyPressed() to decouple and make use of gameObjects better.
	
*/

function GameManager(){
	this.score;
	this.lives;
	this.playing;
	this.paused;	//Tracks pause state as a boolean. Do not confuse with pause()!
	this.isFirefox = typeof InstallTrigger !== 'undefined'; //Playing repeated sound results in memory leak in FF. Much research, still unsure why.
	
	this.gameObjects = new gameObjects(this);
	this.uiObjects = new uiObjects(this);
	//this.controls = new controlManager(this);
	
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
			
			this.playControls();
			
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
	
	this.pause = function(){
		background(0);
		textAlign(CENTER);
		text("PAUSED", width/2, height/2);
	}
	
	//Movement controls controls.
	this.playControls = function(){
		if(!this.gameObjects.shooter.dead){
			if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
				this.gameObjects.shooter.move(true);
			}
			if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
				this.gameObjects.shooter.move(false);
			}			
		}
	}

}

//Additional controls invoked by event handler called whenever a key is pressed.
function keyPressed(){
	if(gameManager.playing){
		//Press Space for shoot
		if(keyCode === 32){
			gameManager.gameObjects.shooter.fire(gameManager.gameObjects.playerBulletManager);
		}
	} else {
		if(keyCode === 87 || keyCode === 38){
			gameManager.uiObjects.changeSelection(-1);
		} else if(keyCode === 83 || keyCode === 40){
			gameManager.uiObjects.changeSelection(1);
		} else if(keyCode === 13 || keyCode === 32){
			gameManager.uiObjects.select();
		}
	}	
}

//Additional control invoked by event handler called whenever a key is released.
function keyReleased(){
	if(gameManager.playing){
		//Press P for pause.
		if(keyCode === 80){
			if(!gameManager.paused){
				gameManager.paused = true;
				noLoop();
			} else{
				gameManager.paused = false;
				loop();
			}
		}
	}
}

	