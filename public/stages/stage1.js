
/*
 - Every entity creation should have a respective dispatch() call.
 - All events for a level should be added between the master entity creation and dispatch calls.
 - There should (generally, not a rule) be one master.addEvent() call per enemy spawned.
 - Projectiles should (again, generally) be spawned by an enemy, but their parent set to master.
   Not doing the former will cause them to spawn even after the entity that spawns them dies (among other things).
   Not doing the latter will cause them to be (improperly!) garbage collected when their spawner dies.
*/

let MASTER = new Entity(null, "MASTER", 0, 0);

/*
spawn enemy at 5 seconds in at the top middle of the screen
2 seconds later, enemy shoots 2 projectiles straight down, spawning on either side of the enemy
1 seconds later, enemy moves to center of screen (over 2 seconds)
*/

MASTER.addEvent(5000, function(MASTER) {
	new Enemy(MASTER, "playerIdle", app.renderer.width / 2, 48, 5).addEvent(2000, function(enemy) {
		let projectiles = [
			new BoundedProjectile(MASTER, "projectileKnifeIdle", enemy.handle.x - 16, 8, 1),
			new BoundedProjectile(MASTER, "projectileKnifeIdle", enemy.handle.x + 16, 8, 1)
		];
		for (var k = 0; k < 2; k++) {
			projectiles[k].addEvent(0, function(self) {
				self.handle.y += 4;
				return 80;
			});
		}
		for (var k = 0; k < 2; k++) {
			projectiles[k].dispatch();
		}
		return REMOVE_EVENT;
	}).dispatch();
});

MASTER.dispatch();
