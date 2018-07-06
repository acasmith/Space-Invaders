function gameObjects(gameManager){
	this.shooter;
	this.alienManager;
	this.shieldManager;
	this.playerBulletManager;
	this.alienBulletManager;
	
	//Setup for playing the game.
	this.startPlaying = function(){
		this.shooter = new Shooter(this);
		
		this.alienManager = new AlienManager(this);
		this.shieldManager = new ShieldManager(this);
		
		this.playerBulletManager = new BulletManager(1);
		this.alienBulletManager = new BulletManager(-1);
		
		this.createObjects();
	}
	
	//Create gameplay objects.
	this.createObjects = function(){
		this.alienManager.createAliens();
		this.shieldManager.createShields();
	}
	
	this.reloadLevel = function(){
		this.alienManager.reloadLevel();
		this.playerBulletManager.reloadLevel();
		this.alienBulletManager.reloadLevel();
	}
	
	
	this.manage = function(){
		this.playerBulletManager.manage();
		this.alienBulletManager.manage();
		this.alienManager.manage();
		this.shieldManager.manage();
		this.shooter.manage();
	}
	
	this.isLoss = function(){
		this.alienManager.aliensLanded();
	}
	
	this.getPlayerBullets = function(){
		return this.playerBulletManager;
	}
	
	this.getAlienBullets = function(){
		return this.alienBulletManager;
	}
	
	this.isLevelCleared = function(){
		return this.alienManager.isEmpty();
	}
	
	this.playerDeath = function(){
		this.gameManager.playerDeath();
		this.alienManager.setPause(true);
		//Timeout (2.5s) new shooter, aliens resume.
		var self = this;
		setTimeout(function(){
			self.shooter = new Shooter(self);
			self.alienManager.setPause(false);
		}, 2500);
	}
	
}