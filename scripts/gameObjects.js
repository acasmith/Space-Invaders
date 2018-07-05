function gameObjects(){
	this.shooter;
	this.alienManager;
	this.shieldManager;
	this.playerBulletManager;
	this.alienBulletManager;
	
	//Setup for playing the game.
	this.startPlaying = function(){
		this.shooter = new Shooter();
		
		this.alienManager = new AlienManager();
		this.shieldManager = new ShieldManager();
		
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
		this.alienManager.manage(this.playerBulletManager, this.alienBulletManager);
		this.shieldManager.manage(this.playerBulletManager);
		this.shooter.manage(this.alienManager, this.alienBulletManager);
	}
	
	
}