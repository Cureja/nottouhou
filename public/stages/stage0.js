let MASTER = new Entity(null, "MASTER", 0, 0);

MASTER.addEvent(1000, function(MASTER) {
	new Enemy(MASTER, "playerIdle", app.renderer.width / 2, 48, 5).addEvent(1000, function(enemy) {
		let coneProjectiles =  [];
		//Fires 30 projectiles
		for (var i = 0; i < 3; i++) {
			coneProjectiles.push(new BoundedProjectile(MASTER, "projectileKnifeIdle45", enemy.handle.x - 10, 8, 1))
      		coneProjectiles.push(new BoundedProjectile(MASTER, "projectileKnifeIdle135", enemy.handle.x + 10, 8, 1))
      		coneProjectiles.push(new BoundedProjectile(MASTER, "projectileKnifeIdle180", enemy.handle.x, 8, 1))
		}
		var counter = 0;
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				//This is for the 45 degrees so curve left
				if (j == 0) {
					coneProjectiles[counter].addEvent(100, function(self) {
					self.handle.y += 2;
					self.handle.x -= 0.5;
					return 80;
					});
		    	}
		      	//This is for the 135 degree so curve right
		      	else if (j == 1) {
					coneProjectiles[counter].addEvent(100, function(self) {
					self.handle.y += 2;
					self.handle.x += 0.5;
					return 80;
		        	});
		    	}
		      	//This shoots straight down
				else if (j == 2) {
					coneProjectiles[counter].addEvent(100, function(self) {
					self.handle.y += 2;
					return 80;
					});
				}
				counter = counter + 1;
			}
		}
    for (var k = 0; k < 9; k++) {
    	  coneProjectiles[k].dispatch(enemyProjectiles);
    }

	}).dispatch();
	return 10000;
});

MASTER.dispatch();
