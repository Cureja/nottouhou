
//subterranean animism, stage 1, normal

let MASTER = new Entity(null, "MASTER", 0, 0);

for (var k = 0; k < 3; k++) {
	let off = 32 * (k + 1);
	MASTER.addEvent(2000 + k * 500, (MASTER) => {
		let enemies = [
			new Enemy(MASTER, "playerIdle", -32, app.renderer.height + 48, 5).addEvent(0, (enemy) => {
				enemy.addEvent(0, createLinearMovement(enemy.handle.x, enemy.handle.y, off, 32, 1000));
				return REMOVE_EVENT;
			}).addEvent(1000, (enemy) => {
				new BoundedProjectile(MASTER, "projectileKnifeIdle180", enemy.handle.x, enemy.handle.y, 1).addEvent(0, (self) => {
					self.addEvent(0, createLinearProjection(self.handle.x, self.handle.y, player.handle.x, player.handle.y, 1000));
				}).dispatch(enemyProjectiles);
				return REMOVE_EVENT;
			}),
			new Enemy(MASTER, "playerIdle", app.renderer.width + 32, app.renderer.height + 48, 5).addEvent(0, (enemy) => {
				enemy.addEvent(0, createLinearMovement(enemy.handle.x, enemy.handle.y, app.renderer.width - off, 32, 1000));
				return REMOVE_EVENT;
			}).addEvent(1000, (enemy) => {
				new BoundedProjectile(MASTER, "projectileKnifeIdle180", enemy.handle.x, enemy.handle.y, 1).addEvent(0, (self) => {
					self.addEvent(0, createLinearProjection(self.handle.x, self.handle.y, player.handle.x, player.handle.y, 1000));
				}).dispatch(enemyProjectiles);
				return REMOVE_EVENT;
			})
		];
		for (var h = 0; h < enemies.length; h++) {
			enemies[h].dispatch();
		}
	});
}

MASTER.dispatch();
