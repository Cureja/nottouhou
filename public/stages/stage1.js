// Stage 1

function initializeStage() {

	stageN = 1;
	for(var i = 0; i < 1; i++) {
		let projectionOne = 150;
		let projectionTwo = 200;
		let spiralEnemies = new Enemy(enemies, "cirno", 200, -28, 12)
			.addEvent(0, createLinearMovement(200, 30, 500))
			.addEvent(11000, createLinearProjection(200, -30, 250))
			.addEvent(12500, createDestructor());

		let spiralEnemiesTwo = new Enemy(enemies, "cirno", 300, -28, 12)
			.addEvent(0, createLinearMovement(300, 30, 500))
			.addEvent(11000, createLinearProjection(300, -30, 250))
			.addEvent(12500, createDestructor());

		let spiralEnemiesThree = new Enemy(enemies, "cirno", 400, -28, 12)
			.addEvent(0, createLinearMovement(400, 30, 500))
			.addEvent(11000, createLinearProjection(400, -30, 250))
			.addEvent(12500, createDestructor());

		master.addEvent(0, (_) => {
			enemies.dispatch(3);
		});

		for(var i = 0; i < 50; i++) {
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(spiralEnemies._gc))
				.setRelativeTo(spiralEnemies, 0, 0)
				.addEvent(0, createArcingMovement(spiralEnemies.handle.x - projectionOne, spiralEnemies.handle.y + projectionTwo + (12 * i), app.renderer.width / 2 - (12 * i), app.renderer.height + 50, 1500));
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(spiralEnemies._gc))
				.setRelativeTo(spiralEnemies, 0, 0)
				.addEvent(0, createArcingMovement(spiralEnemies.handle.x + projectionTwo, spiralEnemies.handle.y + projectionOne + (12 * i), app.renderer.width / 2 + (12 * i), app.renderer.height + 50, 1500));
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(spiralEnemiesTwo._gc))
				.setRelativeTo(spiralEnemiesTwo, 0, 0)
				.addEvent(0, createArcingMovement(app.renderer.width / 2 + (12 * i), app.renderer.height / 2, app.renderer.width / 2 - (12 * i), app.renderer.height + 50, 1500));
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(spiralEnemiesTwo._gc))
				.setRelativeTo(spiralEnemiesTwo, 0, 0)
				.addEvent(0, createArcingMovement(app.renderer.width / 2 - (12 * i), app.renderer.height / 2, app.renderer.width / 2 + (12 * i), app.renderer.height + 50, 1500));
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(spiralEnemiesThree._gc))
				.setRelativeTo(spiralEnemiesThree, 0, 0)
				.addEvent(0, createArcingMovement(spiralEnemiesThree.handle.x - projectionOne, spiralEnemiesThree.handle.y + projectionTwo + (12 * i), app.renderer.width / 2 - (12 * i), app.renderer.height + 50, 1500));
			new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(spiralEnemiesThree._gc))
				.setRelativeTo(spiralEnemiesThree, 0, 0)
				.addEvent(0, createArcingMovement(spiralEnemiesThree.handle.x + projectionTwo, spiralEnemiesThree.handle.y + projectionOne + (12 * i), app.renderer.width / 2 + (12 * i), app.renderer.height + 50, 1500));
			master.addEvent(1000 + 150 * i, (_) => {
				enemyProjectiles.dispatch(6);
				return REMOVE_EVENT;
			});
		}
	}

	master.fragment(12500);

	for(var i = 0; i < 1; i++) {
		let offsetX = 0;
		let offsetY = 0;
		let novaFire = new Enemy(enemies, "cirno", app.renderer.width / 2, -20, 25)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 750))
			.addEvent(8000, createLinearProjection(app.renderer.width / 2, -25, 500))
			.addEvent(8500, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var k = 0; k < 50; k++) {
			if(k % 2 == 0) {
				offsetX = -3;
				offsetY = -3;
			}
			else if(k % 3 == 0) {
				offsetX = 3;
				offsetY = 3;
			}
			else {
				offsetX = 0;
				offsetY = 0;
			}
			new BoundedProjectile(enemyProjectiles, "orbMagenta", 0, 0, 1)
				.dependOn(dependsEnemyAlive(novaFire._gc))
				.setRelativeTo(novaFire, 0, 0)
				.addEvent(0, createSpiralProjection(10, 32, 1000))
				.addEvent(500 + k * 100, createProjectionToPlayer(offsetX, offsetY, 2500));

			master.addEvent(1750 + k * 100, (_) => {
				enemyProjectiles.dispatch(1);
			return REMOVE_EVENT;
			});
		}

	}

	master.fragment(8500);

	for(var k = 0; k < 1; k++){
		let offsetX = 0;
		let offsetY = 0;
		let numberProj = 20;
		let theta = 0;
		let enemy = new Enemy(enemies, "chen", app.renderer.width / 2, -50, 30)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 750))
			.addEvent(12000, createLinearProjection(-20, 400, 500))
			.addEvent(13000, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var i = 0; i < numberProj; i++){
			if(i % 2 == 0) {
				offsetX = -2 * i;
				offsetY = -2 * i;
			}
			else if(i % 3 == 0) {
				offsetX = 2 * i;
				offsetY = 2 * i;
			}
			else {
				offsetX = 0;
				offsetY = 0;
			}
			theta += 2 * Math.PI / numberProj;
			new BoundedProjectile(enemyProjectiles, "orbGreen", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 10 * Math.cos(theta), 15 * Math.sin(theta))
				.addEvent(0, createLinearMovement(app.renderer.width / 2 + 290 * Math.cos(theta), app.renderer.height / 2 + 290  * Math.sin(theta), 2000))
				.addEvent(4000, createLinearMovement(app.renderer.width / 2, app.renderer.width / 2, 2000))
				.addEvent(6000 + 100 * i, createProjectionToPlayer(offsetX, offsetY, 500));
		}

		master.addEvent(2000, (_) => {
			enemyProjectiles.dispatch(numberProj);
			return REMOVE_EVENT;
		});

		theta = 0;
		offsetX = 0;
		offsetY = 0;

		for(var i = 0; i < numberProj; i++){
			if(i % 2 == 0) {
				offsetX = -2 * i;
				offsetY = -2 * i;
			}
			else if(i % 3 == 0) {
				offsetX = 2 * i;
				offsetY = 2 * i;
			}
			else {
				offsetX = 0;
				offsetY = 0;
			}
			theta += 3 * Math.PI / numberProj;
			new BoundedProjectile(enemyProjectiles, "orbMagenta", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 10 * Math.cos(theta), 15 * Math.sin(theta))
				.addEvent(0, createLinearMovement(app.renderer.width / 2 + 290 * Math.cos(theta), app.renderer.height / 2 + 290  * Math.sin(theta), 2000))
				.addEvent(4000, createLinearMovement(app.renderer.width / 2, app.renderer.width / 2, 2000))
				.addEvent(7000 + 100 * i, createProjectionToPlayer(offsetX, offsetY, 500));
		}

		master.addEvent(3000, (_) => {
			enemyProjectiles.dispatch(numberProj);
			return REMOVE_EVENT;
		});

		theta = 0;
		offsetX = 0;
		offsetY = 0;


		for(var i = 0; i < numberProj; i++){
			if(i % 2 == 0) {
				offsetX = -2 * i;
				offsetY = -2 * i;
			}
			else if(i % 3 == 0) {
				offsetX = 2 * i;
				offsetY = 2 * i;
			}
			else {
				offsetX = 0;
				offsetY = 0;
			}
			theta += 2.5 * Math.PI / numberProj;
			new BoundedProjectile(enemyProjectiles, "orbRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 10 * Math.cos(theta), 15 * Math.sin(theta))
				.addEvent(0, createLinearMovement(app.renderer.width / 2 + 290 * Math.cos(theta), app.renderer.height / 2 + 290  * Math.sin(theta), 2000))
				.addEvent(4000, createLinearMovement(app.renderer.width / 2, app.renderer.width / 2, 2000))
				.addEvent(8000 + 100 * i, createProjectionToPlayer(offsetX, offsetY, 500));
		}

		master.addEvent(4000, (_) => {
			enemyProjectiles.dispatch(numberProj);
			return REMOVE_EVENT;
		});
	}
	master.fragment(13000);

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
			enemies.dispatch(1);
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
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var v = 0; v < 10; v++) {
			new BoundedProjectile(enemyProjectiles, "orbYellow", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0 + v * 200, createArcingMovement(50 + xoffSet * i, 150, 100 + xoffSet * i, 300, 500))
				.addEvent(500 + v * 200, createArcingMovement(150 + xoffSet * i, 450, 100 + xoffSet * i, 600, 500))
				.addEvent(1000 + v * 200, createLinearProjection(100 + xoffSet * i, 620, 500))
		}

		master.addEvent(5000, (_) => {
			enemyProjectiles.dispatch(10);
			return REMOVE_EVENT;
		});
	}

	master.fragment(11000);

	for(var i = 0; i < 20; i++){
		let redEnemy = new Enemy(enemies, "fairyRed", app.renderer.width / 2, -28, 8)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 1000))
			.addEvent(1000, createSpiralProjection(32, 54, 2500));

		master.addEvent(1000 + 300 * i, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		new BoundedProjectile(enemyProjectiles, "orbGreen", 0, 0, 1)
				.dependOn(dependsEnemyAlive(redEnemy._gc))
				.setRelativeTo(redEnemy, 0 , 0)
				.addEvent(0, createProjectionToPlayer(0, 0, 1000));

		master.addEvent(1350 + 300 * i, (_) => {
			enemyProjectiles.dispatch(1);
			return REMOVE_EVENT;
		});
	}
	master.fragment(10000);

	for(var i = 0; i < 1; i++) {
		let boss = new Boss(enemies, "yuyu", app.renderer.width / 2, -50, 150)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 5, 750));

		master.addEvent(0, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		boss.addEvent(0, (self) => {
		    self.handle.x+= (player.handle.x - self.handle.x) / 30;
		    self.handle.y += (player.handle.y - self.handle.y) / 30;
		    return 10;
		});

		for(var k = 0; k < 100; k++) {
			let theta = 0;
			let numberProj = 25;
			let specialNumberX = 300;
			let specialNumberY = 300;
			for(var j = 0; j < numberProj; j++) {
				new BoundedProjectile(enemyProjectiles, "mediumOrbGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(boss._gc))
					.setRelativeTo(boss, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, customProjectionNova(theta));
				theta += (2 * Math.PI) / numberProj;
			}
			master.addEvent(1550 + 1000 * k, (_) => {
				enemyProjectiles.dispatch(numberProj);
				return REMOVE_EVENT;
			});
		}
	}
}
