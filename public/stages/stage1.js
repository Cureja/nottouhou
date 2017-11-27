// Stage 1 

function initializeStage() {

	for(var k = 0; k < 3; k++) {
		let off = 200 + (k * 100);
		let yOffsetToggle = 150;
		let yAfterMath = 400;
		let projectionOne = 150;
		let projectionTwo = 200;
		if(k == 1){
			yOffsetToggle = 100;
			yAfterMath = 500;
		}

		let spiralEnemies = new Enemy(enemies, "cirno", off, -28, 20)
			.addEvent(0, createLinearMovement(off, yOffsetToggle, 500))
			.addEvent(15000, createLinearProjection(off, -30, 500))
			.addEvent(18000, createDestructor());

		master.addEvent(0, (_) => {
			spiralEnemies.dispatch(1);
		});

		for(var i = 0; i < 50; i++) {
			if(k == 0){
				new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
					.dependOn(dependsEnemyAlive(spiralEnemies._gc))
					.setRelativeTo(spiralEnemies, 0, 0)
					.addEvent(200 * i, createArcingMovement(spiralEnemies.handle.x - projectionOne, spiralEnemies.handle.y + projectionTwo + (4 * i), app.renderer.width / 2 - (6 * i), app.renderer.height + 50, 2500));
				new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
					.dependOn(dependsEnemyAlive(spiralEnemies._gc))
					.setRelativeTo(spiralEnemies, 0, 0)
					.addEvent(200 * i, createArcingMovement(spiralEnemies.handle.x + projectionTwo, spiralEnemies.handle.y + projectionOne + (4 * i), app.renderer.width / 2 + (6 * i), app.renderer.height + 50, 2500));
			}
			else if(k == 1){
				new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
					.dependOn(dependsEnemyAlive(spiralEnemies._gc))
					.setRelativeTo(spiralEnemies, 0, 0)
					.addEvent(200 * i, createArcingMovement(app.renderer.width / 2 + (8 * i), app.renderer.height / 2, app.renderer.width / 2 - (4 * i), app.renderer.height + 50, 2500));
				new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
					.dependOn(dependsEnemyAlive(spiralEnemies._gc))
					.setRelativeTo(spiralEnemies, 0, 0)
					.addEvent(200 * i, createArcingMovement(app.renderer.width / 2 - (8 * i), app.renderer.height / 2, app.renderer.width / 2 + (4 * i), app.renderer.height + 50, 2500));
			}
			else {
				new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
					.dependOn(dependsEnemyAlive(spiralEnemies._gc))
					.setRelativeTo(spiralEnemies, 0, 0)
					.addEvent(200 * i, createArcingMovement(spiralEnemies.handle.x - projectionTwo, spiralEnemies.handle.y + projectionOne + (4 * i), app.renderer.width / 2 - (6 * i), app.renderer.height + 50, 2500));
				new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
					.dependOn(dependsEnemyAlive(spiralEnemies._gc))
					.setRelativeTo(spiralEnemies, 0, 0)
					.addEvent(200 * i, createArcingMovement(spiralEnemies.handle.x + projectionOne, spiralEnemies.handle.y + projectionTwo + (4 * i), app.renderer.width / 2 + (6 * i), app.renderer.height + 50, 2500));
			}
			master.addEvent(1500, (_) => {
				enemyProjectiles.dispatch(2);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(18000);

	for(var i = 0; i < 1; i++) {

		let novaFire = new Enemy(enemies, "cirno", app.renderer.width / 2, -20, 50)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 750))
			.addEvent(12000, createLinearProjection(app.renderer.width/2, -25, 500))
			.addEvent(22000, createDestructor());

		master.addEvent(1000, (_) => {
			novaFire.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var k = 0; k < 50; k++) {
			new BoundedProjectile(enemyProjectiles, "orbMagenta", 0, 0, 1)
				.dependOn(dependsEnemyAlive(novaFire._gc))
				.setRelativeTo(novaFire, 0, 0)
				.addEvent(0, createSpiralProjection(10, 12, 1000))
				.addEvent(5000 + k * 50, createProjectionToPlayer(750));

			master.addEvent(2000, (_) => {
				enemyProjectiles.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(22000);

}

