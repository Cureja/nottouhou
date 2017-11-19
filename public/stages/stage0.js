function initializeStage() {
	for (var k = 0; k < 3; ++k) {
		let off = 150 * (k + 1);
		let middle = new Enemy(enemies, "cirno", -32, app.renderer.height + 48, 2)
			.addEvent(0, createLinearMovement(off, 32, 1000))
			.addEvent(5500 + k * 250, createLinearProjection(app.renderer.width + 32, 0, 1000))
			.addEvent(6500 + k * 250, createDestructor());
    
      
		for (var h = 0; h < 3; h++) {
			new BoundedProjectile(enemyProjectiles, "projectileKnifeIdle180", off, 32, 0)
				.dependOn(dependsEnemyAlive(h))
				.setRelativeTo(middle, 0, 0)
				.addEvent(0, createProjectionToPlayer(750));
		}
			
		master.addEvent(2000 + k * 500, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});
	}
  
	//Lane's Shot Sequence Algorithm
	for (var k = 0; k < 3; k++) {
	master.addEvent(k * 1750, (_) => {
	  enemyProjectiles.dispatch(1);
	  enemyProjectiles.seek(2);
	  return REMOVE_EVENT;
	});
	master.addEvent(k * 1750 + 500, (_) => {
	  enemyProjectiles.dispatch(1);
	  enemyProjectiles.seek(2);
	  return REMOVE_EVENT;
	});
	master.addEvent(k * 1750 + 1000, (_) => {
	  enemyProjectiles.dispatch(1);
	  enemyProjectiles.seek(-6);
	  return REMOVE_EVENT;
	});
	}

   master.fragment(6500);

  for (var k = 0; k < 4; k++){
		let sideOffSet = 25 * (k + 1);
		let leftSide = new Enemy(enemies, "cirno", -28, app.renderer.height + 48, 3)
			.addEvent(0, createLinearMovement(sideOffSet, 32, 1000))
			.addEvent(5000 + k * 200, createLinearProjection(app.renderer.width + 30, 2 * app.renderer.height / 3, 750))
			.addEvent(6000 + k * 200, createDestructor());
		let rightSide = new Enemy(enemies, "cirno", app.renderer.width + 28, app.renderer.height + 48, 3)
			.addEvent(0, createLinearMovement(app.renderer.width - sideOffSet, 32, 1000))
			.addEvent(5000 + k * 200, createLinearProjection(-30, 2 * (app.renderer.width / 3), 750))
			.addEvent(6000 + k * 200, createDestructor());
		let midSide = new Enemy(enemies, "cirno", 300, -20, 3)
			.addEvent(0, createLinearMovement(250 + sideOffSet, 32, 1000))
			.addEvent(5500, createProjectionToPlayer(750));

		master.addEvent(500 + k * 500, (_) => {
			enemies.dispatch(3);
			return REMOVE_EVENT;
		});
  }

  master.fragment(6800);

}