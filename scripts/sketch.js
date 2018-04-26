/**
	Main.
**/
var gameManager;

function preload(){
	Alien.prototype.preload();
	Alien2.prototype.preload();
	Alien3.prototype.preload();
	FlyingSaucer.prototype.preload();
}

function setup(){
  Alien.prototype.setup();
  Alien2.prototype.setup();
  Alien3.prototype.setup();
  FlyingSaucer.prototype.setup();
  createCanvas(640,480);
  gameManager = new GameManager();
  gameManager.startGame();
} 

function draw() {
	background(0);
	gameManager.manage();
}



