
//subterranean animism, stage 1, normal

function initializeStage() {
	for (var k = 0; k < 3; ++k) {
		let off = 28 * (k + 1);
		let left = new Enemy(enemies, "cirno", -28, app.renderer.height + 50, 5)
			.addEvent(0, createLinearMovement(off, 28, 1000))
			.addEvent(4500 + k * 250, createLinearProjection(app.renderer.width + 28, app.renderer.height / 2, 1000))
			.addEvent(5500 + k * 250, createDestructor());
		let right = new Enemy(enemies, "cirno", app.renderer.width + 28, app.renderer.height + 50, 5)
			.addEvent(0, createLinearMovement(app.renderer.width - off, 28, 1000))
			.addEvent(4500 + k * 250, createLinearProjection(-32, app.renderer.height / 2, 1000))
			.addEvent(5500 + k * 250, createDestructor());;
		new BoundedProjectile(enemyProjectiles, "orbGrey", 0, 0, 1)
			.dependOn(dependsEnemyAlive(left._gc))
			.setRelativeTo(left, 0, 0)
			.addEvent(0, createProjectionToPlayer(3000));
		new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
			.dependOn(dependsEnemyAlive(right._gc))
			.setRelativeTo(right, 0, 0)
			.addEvent(0, createProjectionToPlayer(3000));

		master.addEvent(2000 + k * 500, (_) => {
			enemies.dispatch(2);
			return REMOVE_EVENT;
		});
		master.addEvent(3500 + k * 500, (_) => {
			enemyProjectiles.dispatch(2);
			return REMOVE_EVENT;
		});
	}
	master.fragment(10000);

	let halfWidth = app.renderer.width / 2;

	for (var k = 0, index = 5, dir = 1; k < 20; k++) {
		let enemy = new Enemy(enemies, "fairyBlue", app.renderer.width / 2, -50, 5)
			.addEvent(0, (self) => {
				let startX = self.handle.x;
				let startY = self.handle.y;
				let event = (self) => {
					self.handle.y += 4;
					//TODO pull app.renderer.height * 10 out to a constant (on line ~36)
					self.handle.x = startX + halfWidth * Math.sin((self.handle.y - startY) / app.renderer.height * 10);
					if (self.handle.y > app.renderer.height) {
						self.mutateEvent(createDestructor());
						return 0;
					}
					return 20;
				};
				self.mutateEvent(event);
				return event(self);
			});

		master.addEvent(k * 500, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		if (index == 9) {
			dir = -1;
		} else if (index == 0) {
			dir = 1;
		}
		index += dir;
	}
	master.fragment(14000);

	for (var k = 0; k < 1; k ++) {
		let enemy = new Enemy(enemies, "cirno", app.renderer.width / 2, - 50, 30)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 4, 750));

		master.addEvent(0, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var i = 0; i < 30; i++) {
			new BoundedProjectile(enemyProjectiles, "orbOrange", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(100 * i, createArcingMovement(app.renderer.width / 2 + 100, app.renderer.height / 2, app.renderer.width / 2, app.renderer.height + 1, 1500));
			new BoundedProjectile(enemyProjectiles, "orbOrange", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(100 * i, createArcingMovement(app.renderer.width / 2 - 100, app.renderer.height / 2, app.renderer.width / 2, app.renderer.height + 1, 1500));

			master.addEvent(750 + i * 100, (_) => {
				enemyProjectiles.dispatch(2);
				return REMOVE_EVENT;
			});
		}

		for(var i = 0; i < 10; i++) {
			new BoundedProjectile(enemyProjectiles, "orbLightBlue", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(100 * i, createLinearProjection(app.renderer.width / 2, 500, 1500));

			master.addEvent(2750 + i * 200, (_) => {
				enemyProjectiles.dispatch(1);
				return REMOVE_EVENT;
			});
		}

	}
	master.fragment(1000);

	for(var k = 0; k < 4; k++) {
		let left = new Enemy(enemies, "fairyRed", -28, -50, 5)
			.addEvent(300 + 1800 * k, createLinearProjection(app.renderer.width / 2 - 14 * k, 450, 2500));
		let lMiddle1 = new Enemy(enemies, "fairyGreen", app.renderer.width / 2 - 28, -50, 5)
			.addEvent(600 + 1800 * k, createProjectionToPlayer(2500 - 100 * k));
		let rMiddle1 = new Enemy(enemies, "fairyBlue", app.renderer.width / 2 + 28, -50, 5)
			.addEvent(900 + 1800 * k, createLinearProjection(app.renderer.width - 150, app.renderer.height / 2 + 50 * k, 2500));
		let right = new Enemy(enemies, "fairyGreen", app.renderer.width + 28, -50, 5)
			.addEvent(1200 + 1800 * k, createProjectionToPlayer(2500));
		let rMiddle2 = new Enemy(enemies, "fairyBlue", app.renderer.width / 2 + 28, -50, 5)
			.addEvent(1500 + 1800 * k, createProjectionToPlayer(2500 + 150 * k));
		let lMiddle2 = new Enemy(enemies, "fairyRed", app.renderer.width / 2 - 28, -50, 5)
			.addEvent(1800 + 1800 * k, createProjectionToPlayer(2500));

		for(var i = 1; i <= 6; i++) {
			master.addEvent(i * 300 + k * 1800 , (_) => {
				enemies.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(12000);

	for (var k = 0; k < 4; k++) {
		let sideOffSet = 25 * (k + 1);
		let leftSide = new Enemy(enemies, "cirno", -28, app.renderer.height + 48, 3)
			.addEvent(0, createLinearMovement(sideOffSet, 32, 1000))
			.addEvent(8000 + k * 200, createLinearProjection(app.renderer.width + 30, 2 * app.renderer.height / 3, 750))
			.addEvent(9000 + k * 200, createDestructor());
		let rightSide = new Enemy(enemies, "cirno", app.renderer.width + 28, app.renderer.height + 48, 3)
			.addEvent(0, createLinearMovement(app.renderer.width - sideOffSet, 32, 1000))
			.addEvent(8000 + k * 200, createLinearProjection(-30, 2 * (app.renderer.width / 3), 750))
			.addEvent(9000 + k * 200, createDestructor());
		let midSide = new Enemy(enemies, "cirno", 30, -20, 3)
			.addEvent(0, createLinearMovement(250 + sideOffSet, 32, 1000))
			.addEvent(8000, createProjectionToPlayer(500));

		new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
			.dependOn(dependsEnemyAlive(leftSide._gc))
			.setRelativeTo(leftSide, 0, 0)
			.addEvent(0, (self) => { self.handle.y += 8; return 10; });
		new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
			.dependOn(dependsEnemyAlive(rightSide._gc))
			.setRelativeTo(rightSide, 0, 0)
			.addEvent(0, (self) => { self.handle.y += 8; return 10; });
		new BoundedProjectile(enemyProjectiles, "orbLightRed", 0 ,0, 1)
			.dependOn(dependsEnemyAlive(midSide._gc))
			.setRelativeTo(midSide, 0, 0)
			.addEvent(0, (self) => { self.handle.y += 8; return 10; });

		master.addEvent(500 + k * 500, (_) => {
			enemies.dispatch(3);
			return REMOVE_EVENT;
		});
	}
	master.addEvent(3000, (_) => {
		enemyProjectiles.dispatch(12);
		return REMOVE_EVENT;
  	});
	master.fragment(9800);

	var xmod = -1;
	for(var k = 0; k < 9; k++) {
		let xSpawn = app.renderer.width / 2 + 350 * xmod;
		let yOffset = 60 + 60 * k;
		let xGenerate = app.renderer.width / 2 + 250 * xmod;
		let leftAndRight = new Enemy(enemies, "cirno", xSpawn, yOffset, 3)
			.addEvent(0, createLinearMovement(xGenerate, yOffset, 500))
			.addEvent(8000, createLinearProjection(app.renderer.width / 2 + 350 * xmod, yOffset, 500))
			.addEvent(9000, createDestructor());
		new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1)
			.dependOn(dependsEnemyAlive(leftAndRight._gc))
			.setRelativeTo(leftAndRight, 0, 0)
			.addEvent(0, createLinearProjection(app.renderer.width / 2 - 150 * xmod,  yOffset, 1000));
		master.addEvent(500 + k * 50, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});
		xmod *= -1;
	}

	for(var i = 0; i < 5; i++){
		master.addEvent(2000, (_) => {
			enemyProjectiles.dispatch(1)
			enemyProjectiles.seek(1)
			return REMOVE_EVENT;
		});
	}
	master.addEvent(2500, (_) => {
			enemyProjectiles.seek(-9);
	});
	for(var i = 0; i < 4; i++){
		master.addEvent(3750, (_) => {
			enemyProjectiles.dispatch(1);
			enemyProjectiles.seek(1);
			return REMOVE_EVENT;
		});
	}
	master.fragment(9000);


	/**
	* NOT SURE IF THIS WORKS YET
	*/
	for(var i = 0; i < 1; i++) {
		let n = 15;
		let enemy = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 10)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 1250))
			.addEvent(4000, createArcingMovement(app.renderer.width / 4, app.renderer.height / 4, 0, -50, 1000))
			.addEvent(5000, createDestructor());

		//Spawning n projectiles in a circle
		for(var k = 0; k < 360; k += (360 / n)){
			new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 15 * Math.cos(k), 15 * Math.sin(k))
				.addEvent(1500, createLinearProjection(300 * Math.cos(k), 300 * Math.sin(k), 1000));
		}

		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		master.addEvent(2250, (_) => {
			enemies.dispatch(n);
			return REMOVE_EVENT;
		});
	}
	master.fragment(7000);

	/**
	* NOT SURE IF THIS WORKS YET
	*/
	for(var i = 0; i < 1; i++) {
		let enemy = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 10)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 1250))
			.addEvent(4000, createArcingMovement(app.renderer.width / 4, app.renderer.height / 4, 0, -50, 1000))
			.addEvent(5000, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var k = 0; k < 30; k++) {
			new BoundedProjectile(enemyProjectiles, "orbMagenta", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(1500, createSpiralProjection(30, 150, 1500));

			master.addEvent(2250 + k * 50, (_) => {
				enemies.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(10000);

	/**
	* NOT SURE IF THIS WORKS YET
	*/
	for(var i = 0; i < 1; i++) {
		let enemy = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 10)
			.addEvent(0, createLinearMovement(app.renderer.width / 2, app.renderer.height / 2, 1250))
			.addEvent(4000, createArcingMovement(app.renderer.width / 4, app.renderer.height / 4, 0, -50, 1000))
			.addEvent(5000, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var k = 0; k < 30; k++) {
			new BoundedProjectile(enemyProjectiles, "orbMagenta", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(1500, createSpiralProjection(30, 150, 1500));

			master.addEvent(2250 + k * 50, (_) => {
				enemies.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(10000);

	/**
	* Kills 1 second after last fragment
	* ALWAYS KEEP AT BOTTOM
	*/
	new BoundedProjectile(enemyProjectiles, "orbLightRed", 0, 0, 1).setRelativeTo(player, 0, 0);
  	master.addEvent(1000, (_) => {
      enemyProjectiles.dispatch(1);
      return REMOVE_EVENT;
    });
}
