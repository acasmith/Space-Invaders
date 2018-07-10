function controlManager(gameManager){
	this.gameManager = gameManager;
	
	this.manage = function(){
		this.playerMovement();
	}
	
	this.playerMovement = function(){
		if(!this.gameManager.isPlayerDead()){
			if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
				this.gameManager.playerMove(true);
			}
			if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
				this.gameManager.playerMove(false);
			}			
		}
	}
	
	/* Certain controls require the p5 PeyPressed event.
	A KeyPressed function must be publically exposed for p5
	to call, and is handled via gameManagers public interface.
	The behaviour is defined here separately to reduce coupling.
	*/
	this.keyPressed = function(){
		if(gameManager.isPlaying()){
			//Press Space for shoot
			if(keyCode === 32){
				gameManager.playerShoot();
			}
		} else {
			if(keyCode === 87 || keyCode === 38){
				gameManager.changeMenuSelection(-1);
			} else if(keyCode === 83 || keyCode === 40){
				gameManager.changeMenuSelection(1);
			} else if(keyCode === 13 || keyCode === 32){
				gameManager.menuSelect();
			}
		}
	}
	
	this.keyReleased = function(){
		if(gameManager.isPlaying()){
			//Press P for pause.
			if(keyCode === 80){
				if(!gameManager.isPaused()){
					gameManager.setPaused(true);
					noLoop();
				} else{
					gameManager.setPaused(false);
					loop();
				}
			}
		}
	}
}