function GameManager(){
	this.score;
	this.lives;
	this.shooter;
	this.alienManager;
	this.playerBulletManager;
	this.alienBulletManager;
	this.ui;
	this.menu;
	this.playing;
	this.paused;	//Tracks pause state as a boolean. Do not confuse with pause()!
	this.isFirefox = typeof InstallTrigger !== 'undefined'; //Playing repeated sound results in memory leak in FF. Much research, still unsure why.
	this.shieldManager;
	
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
		this.shooter = new Shooter();
		this.alienManager = new AlienManager();
		this.shieldManager = new ShieldManager();
		this.playerBulletManager = new BulletManager(1);
		this.alienBulletManager = new BulletManager(-1);
		this.ui = new UI();
		this.alienManager.createAliens();
		this.shieldManager.createShields();
	}
	
	//Resets the aliens and clears all active bullets.
	this.reloadLevel = function(){
		this.lives += 1;
		this.alienManager.reloadLevel();
		this.playerBulletManager.reloadLevel();
		this.alienBulletManager.reloadLevel();
	}
	
	//Invokes all the functions necessary for each draw cycle.
	this.manage = function(){
		if(!this.playing){
			this.menu.display();
		} else{
			this.playerBulletManager.manage();
			this.alienBulletManager.manage();
			this.playControls();
			this.alienManager.manage(this.playerBulletManager, this.alienBulletManager);
			this.shieldManager.manage(this.playerBulletManager);
			this.shooter.manage(this.alienManager, this.alienBulletManager);
			this.ui.display(this.score, this.lives);
			this.checkGameStatus();
			if(this.paused){
				this.pause();
			}
		}
	}
	
	//Checks the win/loss status on the game.
	this.checkGameStatus = function(){
		if(this.lives === 0 || this.alienManager.aliensLanded()){
			this.gameOver();
		}
		else if(this.alienManager.isEmpty()){
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
	//Resets shooter and alienActivity after 3 seconds.
	this.playerDeath = function(){
		this.alienManager.setPause(true);
		this.updateLives(-1);
		//Timeout (3s) new shooter, aliens resume.
		var self = this;
		setTimeout(function(){
			self.shooter = new Shooter(); 
			self.alienManager.setPause(false);
		}, 2500);
	}
	
	this.pause = function(){
		background(0);
		textAlign(CENTER);
		text("PAUSED", width/2, height/2);
	}
	
	//controls N.B fire control still in sketch.
	this.playControls = function(){
		if(!this.shooter.dead){
			if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
				this.shooter.move(true);
			}
			if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
				this.shooter.move(false);
			}			
		}
	}

}

//Event handler called whenever a key is pressed.
function keyPressed(){
	if(gameManager.playing){
		//Press Space for shoot
		if(keyCode === 32){
		gameManager.shooter.fire(gameManager.playerBulletManager);
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

//Event handler called whenever a key is released.
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

	