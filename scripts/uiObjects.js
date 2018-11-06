function uiObjects(gameManager){
	this.ui;
	this.menu;
	this.gameManager = gameManager;
	
	this.startGame = function(){
		this.menu = new Menu(0);
	}
	
	this.startPlaying = function(){
		this.ui = new UI();
	}
	
	this.manage = function(){
		if(!this.gameManager.isPlaying()){
			this.menu.manage();
		} else{
			this.ui.manage(this.gameManager.getScore(), this.gameManager.getLives());
		}
	}
	
	this.gameOver = function(){
		this.menu = new Menu(3);
	}
	
	this.changeSelection = function(direction){
		this.menu.changeSelection(direction);
	}
	
	this.select = function(){
		this.menu.select();
	}
	
	this.pause = function(){
		this.ui.pause();
	}
}