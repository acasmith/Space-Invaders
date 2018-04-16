/**
	Main.
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



