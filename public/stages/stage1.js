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
			.addEvent(16000, createDestructor());

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
	master.fragment(16000);

	for(var i = 0; i < 1; i++) {

		let novaFire = new Enemy(enemies, "cirno", app.renderer.width / 2, -20, 50)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 750))
			.addEvent(12000, createLinearProjection(app.renderer.width/2, -25, 500))
			.addEvent(13000, createDestructor());

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
	master.fragment(13000);
	
	for(var k = 0; k < 1; k++){
		let numberProj = 20;
		let theta = 0;
		let enemy = new Enemy(enemies, "cirno", app.renderer.width / 2, 630, 30)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 750))
			.addEvent(14000, createLinearProjection(-20, 400, 500))
			.addEvent(16000, createDestructor());

		for(var i = 0; i < numberProj; i++){
			theta += 2 * Math.PI / numberProj;
			new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 10 * Math.cos(theta), 15 * Math.sin(theta))
				.addEvent(0, createLinearMovement(app.renderer.width / 2 + 290 * Math.cos(theta), app.renderer.height / 2 + 290  * Math.sin(theta), 2000))
				.addEvent(4000, createLinearMovement(app.renderer.width / 2, app.renderer.width / 2, 2000))
				.addEvent(6500 + 100 * i, createProjectionToPlayer(500));
		}

		theta = 0;

		for(var i = 0; i < numberProj; i++){
			theta += 3 * Math.PI / numberProj;
			new BoundedProjectile(enemyProjectiles, "orbMagenta", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 10 * Math.cos(theta), 15 * Math.sin(theta))
				.addEvent(0, createLinearMovement(app.renderer.width / 2 + 290 * Math.cos(theta), app.renderer.height / 2 + 290  * Math.sin(theta), 2000))
				.addEvent(4000, createLinearMovement(app.renderer.width / 2, app.renderer.width / 2, 2000))
				.addEvent(6320 + 150 * i, createProjectionToPlayer(500));
		}
		theta = 0;

		for(var i = 0; i < numberProj; i++){
			theta += 2.5 * Math.PI / numberProj;
			new BoundedProjectile(enemyProjectiles, "orbYellow", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 10 * Math.cos(theta), 15 * Math.sin(theta))
				.addEvent(0, createLinearMovement(app.renderer.width / 2 + 290 * Math.cos(theta), app.renderer.height / 2 + 290  * Math.sin(theta), 2000))
				.addEvent(4000, createLinearMovement(app.renderer.width / 2, app.renderer.width / 2, 2000))
				.addEvent(6430 + 50 * i, createProjectionToPlayer(500));
		}

		master.addEvent(1000, (_) => {
			enemy.dispatch(1);
			return REMOVE_EVENT;
		});

		master.addEvent(2000, (_) => {
			enemyProjectiles.dispatch(numberProj);
			return REMOVE_EVENT;
		});

		master.addEvent(3000, (_) => {
			enemyProjectiles.dispatch(numberProj);
			return REMOVE_EVENT;
		});

		master.addEvent(4000, (_) => {
			enemyProjectiles.dispatch(numberProj);
			return REMOVE_EVENT;
		});
	}
	master.fragment(16000);
	for(var i = 0; i < 1; i++) {
		let projectileAmountOne = 14;
		let projectileAmountTwo = 12;
		let enemy = new Enemy(enemies, "cirno", app.renderer.width / 2, -100, 10)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, 150, 500))
			.addEvent(10000, createArcingMovement(200, 300, app.renderer.width / 2, -20, 1000))
			.addEvent(11000, createDestructor());

		for(var i = 0; i < projectileAmountOne; i++) {
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createLinearProjection(40 * i, 620, 3000));
		}

		for(var i = 0; i < projectileAmountTwo; i ++) {
			new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createLinearProjection(50 * i, 620, 3000));
		}

		for(var i = 0; i < projectileAmountOne; i ++) {
			new BoundedProjectile(enemyProjectiles, "orbYellow", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createLinearProjection(40 * i, 620, 3000));
		}

		for(var i = 0; i < projectileAmountTwo; i++) {
			new BoundedProjectile(enemyProjectiles, "orbRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createLinearProjection(50 * i, 620, 3000));
		}

		for(var i = 0; i < projectileAmountOne; i++) {
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createLinearProjection(40 * i, 620, 3000));
		}

		master.addEvent(1000, (_) => {
			enemy.dispatch(1);
			return REMOVE_EVENT;
		});

		master.addEvent(3000, (_) => {
			enemyProjectiles.dispatch(projectileAmountOne);
			return REMOVE_EVENT;
		});
		master.addEvent(3500, (_) => {
			enemyProjectiles.dispatch(projectileAmountTwo);
			return REMOVE_EVENT;
		});
		master.addEvent(4000, (_) => {
			enemyProjectiles.dispatch(projectileAmountOne);
			return REMOVE_EVENT;
		});
		master.addEvent(4500, (_) => {
			enemyProjectiles.dispatch(projectileAmountTwo);
			return REMOVE_EVENT;
		});
		master.addEvent(5000, (_) => {
			enemyProjectiles.dispatch(projectileAmountOne);
			return REMOVE_EVENT;
		});
	}
	
	for(var i = 0; i < 2; i++) {
		let xoffSet = 400;
		let enemy = new Enemy(enemies, "cirno", 100 + xoffSet * i, -20, 20)
			.addEvent(0, createLinearMovement(100 + xoffSet * i, 50, 1000))
			.addEvent(10000, createArcingMovement(200, 300, app.renderer.width / 2, -20, 500))
			.addEvent(11000, createDestructor());

		master.addEvent(1000, (_) => {
			enemy.dispatch(1);
			return REMOVE_EVENT;
		});	

		for(var v = 0; v < 10; v++) {
			new BoundedProjectile(enemyProjectiles, "orbYellow", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0 + v * 400, createArcingMovement(50 + xoffSet * i, 150, 100 + xoffSet * i, 300, 500))
				.addEvent(500 + v * 400, createArcingMovement(150 + xoffSet * i, 450, 100 + xoffSet * i, 600, 500))
				.addEvent(1000 + v * 400, createLinearProjection(100 + xoffSet * i, 620, 500))	
		}

		master.addEvent(5100, (_) => {
			enemyProjectiles.dispatch(10);
			return REMOVE_EVENT;
		});
	}
	
	master.fragment(11000);

}






