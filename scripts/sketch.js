/**
	Main.
**/
var gameManager;

function preload(){
	Alien.prototype.preload();
	Alien2.prototype.preload();
}

function setup() {
  Alien.prototype.setup();
  Alien2.prototype.setup();
  createCanvas(640,480);
  gameManager = new GameManager();
  gameManager.startGame();
} 

function draw() {
	background(0);
	gameManager.manage();
}



