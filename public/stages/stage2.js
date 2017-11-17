
//subterranean animism, stage 1, normal

function initializeStage() {
	for (var k = 0; k < 3; ++k) {
		let off = 32 * (k + 1);
		let left = new Enemy(enemies, "playerIdle", -32, app.renderer.height + 48, 5)
			.addEvent(0, createLinearMovement(off, 32, 1000));
		let right = new Enemy(enemies, "playerIdle", app.renderer.width + 32, app.renderer.height + 48, 5)
			.addEvent(0, createLinearMovement(app.renderer.width - off, 32, 1000));
		new BoundedProjectile(enemyProjectiles, "projectileKnifeIdle180", 0, 0, 1)
			.dependOn(dependsEnemyAlive(left._gc))
			.setRelativeTo(left, 0, 0)
			.addEvent(0, createProjectionToPlayer(1000));
		new BoundedProjectile(enemyProjectiles, "projectileKnifeIdle180", 0, 0, 1)
			.dependOn(dependsEnemyAlive(right._gc))
			.setRelativeTo(right, 0, 0)
			.addEvent(0, createProjectionToPlayer(1000));

		master.addEvent(2000 + k * 500, (_) => {
			enemies.dispatch(2);
			return REMOVE_EVENT;
		});
		master.addEvent(3500 + k * 500, (_) => {
			enemyProjectiles.dispatch(2);
			return REMOVE_EVENT;
		});
	}

	master.fragment();
}
