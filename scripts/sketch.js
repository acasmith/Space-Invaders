/**TODO:
Fix menu controls.
Implement remainder of menu system.

**/
var gameManager;

function setup() {
  createCanvas(640,480);
  gameManager = new GameManager();
  gameManager.startGame();
} 

function draw() {
	background(0);
	gameManager.manage();
}

//controls, fold into this.controls with keyIsDown when single bullet change implemented.
function keyPressed(){
	if(gameManager.playing){
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



