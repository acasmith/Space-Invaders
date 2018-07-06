/*
TODO
	Bug in shooter when player dies. Investigate.
	Update playerDeath(), playerControls(), keyPressed() to decouple and make use of gameObjects better.
	
*/

function GameManager(){
	this.score;
	this.lives;
	this.ui;
	this.menu;
	this.playing;
	this.paused;	//Tracks pause state as a boolean. Do not confuse with pause()!
	this.isFirefox = typeof InstallTrigger !== 'undefined'; //Playing repeated sound results in memory leak in FF. Much research, still unsure why.
	
	this.gameObjects = new gameObjects();
	
	this.startGame = function(){
		this.playing = false;
		this.paused = false;
		this.menu = new Menu(0);
	}
	
	//Provides setup for playing the game.
	this.startPlaying = function(){
		this.playing = true;
		this.score = 0;
		this.lives = 3;

		this.ui = new UI();
		
		this.gameObjects.startPlaying();
	}
	
	//Resets the aliens and clears all active bullets.
	this.reloadLevel = function(){
		this.lives += 1;
		this.gameObjects.reloadLevel();
	}
	
	//Invokes all the functions necessary for each draw cycle.
	this.manage = function(){
		if(!this.playing){
			this.menu.display();
		} else{
			this.playControls();
			
			this.gameObjects.manage();
			
			this.checkGameStatus();
			
			this.ui.display(this.score, this.lives);
			
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
		this.menu = new Menu(3);
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
			gameManager.menu.changeSelection(-1);
		} else if(keyCode === 83 || keyCode === 40){
			gameManager.menu.changeSelection(1);
		} else if(keyCode === 13 || keyCode === 32){
			gameManager.menu.select();
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

	