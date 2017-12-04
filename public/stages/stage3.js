function initializeStage() {
  stageN = 3;
  for (var k = 0; k < 4; ++k) {
		let off = 28 * (k + 1);
		let left = new Enemy(enemies, "cirno", -28, app.renderer.height + 50, 10)
			.addEvent(500, createLinearMovement(off, 28, 1000))
			.addEvent(3500, createLinearProjection(1000,1000, 1000))
			.addEvent(5500 + k * 250, createDestructor());
		let right = new Enemy(enemies, "cirno", app.renderer.width + 28, app.renderer.height + 50, 10)
			.addEvent(500, createLinearMovement(app.renderer.width - off, 28, 1000))
			.addEvent(3500, createLinearProjection(1000, 1000, 1000))
			.addEvent(5500 + k * 250, createDestructor());;
		new BoundedProjectile(enemyProjectiles, "bigOrbGreen", 0, 0, 1)
			.dependOn(dependsEnemyAlive(left._gc))
			.setRelativeTo(left, -10, 0)
			.addEvent(0, createProjectionToPlayer(0, 0, 500));
		new BoundedProjectile(enemyProjectiles, "bigOrbGreen", 0, 0, 1)
			.dependOn(dependsEnemyAlive(right._gc))
			.setRelativeTo(right, -10, 0)
			.addEvent(0, createProjectionToPlayer(0, 0, 500));

		master.addEvent(2500 + k * 500, (_) => {
			enemies.dispatch(2);
			return REMOVE_EVENT;
		});
		master.addEvent(3500 + k * 500, (_) => {
			enemyProjectiles.dispatch(2);
			return REMOVE_EVENT;
		});
	}
	master.fragment(5000);
  for (var k = 0; k < 6; ++k) {
    let off = 28 * (k + 1);
    let left = new Enemy(enemies, "fairyRed", -28, app.renderer.height + 50, 10)
      .addEvent(500, createLinearMovement(off, 28, 1000))
      .addEvent(3000, createLinearProjection(1000,1000, 1000))
      .addEvent(5500 + k * 250, createDestructor());
    let right = new Enemy(enemies, "fairyRed", app.renderer.width + 28, app.renderer.height + 50, 10)
      .addEvent(500, createLinearMovement(app.renderer.width - off, 28, 1000))
      .addEvent(3000, createLinearProjection(1000, 1000, 1000))
      .addEvent(5500 + k * 250, createDestructor());;
    new BoundedProjectile(enemyProjectiles, "bigOrbRed", 0, 0, 1)
      .dependOn(dependsEnemyAlive(left._gc))
      .setRelativeTo(left, -10, 0)
      .addEvent(0, createProjectionToPlayer(0, 0, 500));
    new BoundedProjectile(enemyProjectiles, "bigOrbGreen", 0, 0, 1)
      .dependOn(dependsEnemyAlive(right._gc))
      .setRelativeTo(right, -10, 0)
      .addEvent(0, createProjectionToPlayer(0, 0, 500));

    master.addEvent(2500 + k * 500, (_) => {
      enemies.dispatch(2);
      return REMOVE_EVENT;
    });
    master.addEvent(3500 + k * 500, (_) => {
      enemyProjectiles.dispatch(2);
      return REMOVE_EVENT;
    });
  }
  master.fragment(7000);

}
