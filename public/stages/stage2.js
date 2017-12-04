
//subterranean animism, stage 1, normal

function initializeStage() {
	stageN = 2;
	var xmod = -1;
	let halfWidth = app.renderer.width / 2;
	let halfHeight = app.renderer.height / 2;
	for(var k = 0; k < 3; k++) {
		let topLeft = new Enemy(enemies, "fairyRed", -28, 100, 5)
			.addEvent(200 + 600 * k, createArcingMovement(halfWidth, 15, app.renderer.width + 28, 100, 1500));
		let topRight = new Enemy(enemies, "fairyRed", app.renderer.width + 28, 100, 5)
			.addEvent(200 + 600 * k, createArcingMovement(halfWidth, 15, -28, 150, 1500));
		let midLeft = new Enemy(enemies, "fairyGreen", -28, 150, 5)
			.addEvent(400 + 600 * k, createArcingMovement(halfWidth, 15, app.renderer.width + 28, 150, 1500));
		let midRight = new Enemy(enemies, "fairyGreen", app.renderer.width + 28, 150, 5)
			.addEvent(400 + 600 * k, createArcingMovement(halfWidth, 15, -28, 100, 1500));
		let bottomLeft = new Enemy(enemies, "fairyBlue", -28, 200, 5)
			.addEvent(600 + 600 * k, createArcingMovement(halfWidth, 15, app.renderer.width + 28, 200, 1500));
		let bottomRight = new Enemy(enemies, "fairyBlue", app.renderer.width + 28, 200, 5)
			.addEvent(600 + 600 * k, createArcingMovement(halfWidth, 15, -28, 200, 1500));
		master.addEvent(0, (_) => {
			enemies.dispatch(6);
			return REMOVE_EVENT;
		});

		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(topLeft._gc))
			.setRelativeTo(topLeft, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth + 100 * k, app.renderer.height, 1500));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(topRight._gc))
			.setRelativeTo(topRight, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth - 100 * k, app.renderer.height, 1500));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(midLeft._gc))
			.setRelativeTo(midLeft, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth + 100 * k, app.renderer.height, 1750));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(midRight._gc))
			.setRelativeTo(midRight, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth - 100 * k, app.renderer.height, 1750));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(bottomLeft._gc))
			.setRelativeTo(bottomLeft, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth + 100 * k, app.renderer.height, 2000));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(bottomRight._gc))
			.setRelativeTo(bottomRight, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth - 100 * k, app.renderer.height, 2000));
		master.addEvent(750 + 600 * k, (_) => {
			enemyProjectiles.dispatch(6);
			return REMOVE_EVENT;
		});
		xmod *= 1;
	}

	for (var k = 0; k < 3; ++k) {
		let off = 28 * (k + 1);
		let left = new Enemy(enemies, "cirno", -28, app.renderer.height + 50, 30)
			.addEvent(0, createLinearMovement(off, 28, 1000))
			.addEvent(4500 + k * 250, createLinearProjection(app.renderer.width + 28, halfHeight, 1000))
			.addEvent(5500 + k * 250, createDestructor());
		let right = new Enemy(enemies, "cirno", app.renderer.width + 28, app.renderer.height + 50, 30)
			.addEvent(0, createLinearMovement(app.renderer.width - off, 28, 1000))
			.addEvent(4500 + k * 250, createLinearProjection(-32, halfHeight, 1000))
			.addEvent(5500 + k * 250, createDestructor());
		master.addEvent(2500 + k * 500, (_) => {
			enemies.dispatch(2);
			return REMOVE_EVENT;
		});
		for(var i = 0; i < 5; i++) {
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(left._gc))
				.setRelativeTo(left, -10, 0)
				.addEvent(0, createProjectionToPlayer(100*xmod, i*70*xmod, 2000));
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(left._gc))
				.setRelativeTo(left, 10, 0)
				.addEvent(0, createProjectionToPlayer(50*xmod, i*50*xmod, 2000));
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(right._gc))
				.setRelativeTo(right, -10, 0)
				.addEvent(0, createProjectionToPlayer(100*xmod, i*70*xmod, 2000));
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(right._gc))
				.setRelativeTo(right, 10, 0)
				.addEvent(0, createProjectionToPlayer(50*xmod, i*50*xmod, 2000));
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(left._gc))
				.setRelativeTo(left, -30, 0)
				.addEvent(0, createProjectionToPlayer(0, 0, 2500));
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(left._gc))
				.setRelativeTo(left, 30, 0)
				.addEvent(0, createProjectionToPlayer(0, 0, 2500));
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(right._gc))
				.setRelativeTo(right, -30, 0)
				.addEvent(0, createProjectionToPlayer(0, 0, 2500));
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
				.dependOn(dependsEnemyAlive(right._gc))
				.setRelativeTo(right, 30, 0)
				.addEvent(0, createProjectionToPlayer(0, 0, 2500));
			xmod*=-1;
			master.addEvent(3500 + k * 500 + i * 100, (_) => {
				enemyProjectiles.dispatch(8);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(10000);

	for(var i = 0; i < 1; i++) {
		let topLeft = new Enemy(enemies, "cirno", -50, -50, 30)
			.addEvent(0, createLinearMovement(50, 50, 750))
			.addEvent(3000, createLinearProjection(-50, -50, 750))
			.addEvent(3750, createDestructor());
		let topRight = new Enemy(enemies, "cirno", app.renderer.width + 50, -50, 30)
			.addEvent(0, createLinearMovement(app.renderer.width - 50, 50, 750))
			.addEvent(3000, createLinearProjection(app.renderer.width + 50, -50, 750))
			.addEvent(3750, createDestructor());
		let bottomLeft = new Enemy(enemies, "cirno", -50, app.renderer.height + 50, 30)
			.addEvent(0, createLinearMovement(50, app.renderer.height - 50, 750))
			.addEvent(3000, createLinearProjection(-50, app.renderer.height + 50, 750))
			.addEvent(3750, createDestructor());
		let bottomRight = new Enemy(enemies, "cirno", app.renderer.width + 50, app.renderer.height + 50, 30)
			.addEvent(0, createLinearMovement(app.renderer.width - 50, app.renderer.height - 50, 750))
			.addEvent(3000, createLinearProjection(app.renderer.width + 50, app.renderer.height + 50, 750))
			.addEvent(3750, createDestructor());
		let middle = new Enemy(enemies, "cirno", halfWidth, -50, 30)
			.addEvent(0, createLinearMovement(halfWidth, halfHeight, 1000))
			.addEvent(3000, createLinearProjection(halfWidth, -50, 1000))
			.addEvent(3750, createDestructor());
		master.addEvent(0, (_) => {
			enemies.dispatch(5);
			return REMOVE_EVENT;
		});

		let theta = 0, n = 25;
		for(var k = 0; k < n; k++) {
			theta += 2 * Math.PI / n;
			new BoundedProjectile(enemyProjectiles, "mediumOrbGrey", 0, 0, 1)
				.dependOn(dependsEnemyAlive(topLeft._gc))
				.setRelativeTo(topLeft, 20 * Math.cos(theta), 20 * Math.sin(theta))
				.addEvent(0, createLinearProjection(50 + 100 * Math.cos(theta), 50 + 100 * Math.sin(theta), 750));
			new BoundedProjectile(enemyProjectiles, "mediumOrbGrey", 0, 0, 1)
				.dependOn(dependsEnemyAlive(topRight._gc))
				.setRelativeTo(topRight,20 * Math.cos(theta), 20 * Math.sin(theta))
				.addEvent(0, createLinearProjection(app.renderer.width - 50 + 100 * Math.cos(theta), 50 + 100 * Math.sin(theta), 750));
			new BoundedProjectile(enemyProjectiles, "mediumOrbGrey", 0, 0, 1)
				.dependOn(dependsEnemyAlive(bottomLeft._gc))
				.setRelativeTo(bottomLeft, 20 * Math.cos(theta), 20 * Math.sin(theta))
				.addEvent(0, createLinearProjection(50 + 100 * Math.cos(theta), app.renderer.height - 50 + 100 * Math.sin(theta), 750));
			new BoundedProjectile(enemyProjectiles, "mediumOrbGrey", 0, 0, 1)
				.dependOn(dependsEnemyAlive(bottomRight._gc))
				.setRelativeTo(bottomRight, 20 * Math.cos(theta), 20 * Math.sin(theta))
				.addEvent(0, createLinearProjection(app.renderer.width - 50 + 100 * Math.cos(theta), app.renderer.height - 50 + 100 * Math.sin(theta), 750));
			new BoundedProjectile(enemyProjectiles, "mediumOrbGrey", 0, 0, 1)
				.dependOn(dependsEnemyAlive(middle._gc))
				.setRelativeTo(middle, 20 * Math.cos(theta), 20 * Math.sin(theta))
				.addEvent(0, createLinearProjection(halfWidth + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 750));
			master.addEvent(1250, (_) => {
				enemyProjectiles.dispatch(5);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(3750);

	for (var k = 0, index = 5, dir = 1; k < 20; k++) {
		let enemy = new Enemy(enemies, "fairyBlue", halfWidth, -50, 5)
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
		new BoundedProjectile(enemyProjectiles, "orbOrange", 0, 0, 1)
			.dependOn(dependsEnemyAlive(enemy._gc))
			.setRelativeTo(enemy, 0, 0)
			.addEvent(0, createProjectionToPlayer(0, 0, 1500))
		master.addEvent(k * 500, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});
		master.addEvent(1000 + k * 500, (_) => {
			enemyProjectiles.dispatch(1);
			return REMOVE_EVENT;
		})

		new BoundedProjectile(enemyProjectiles, "orbOrange", 0, 0, 1)
			.dependOn(dependsEnemyAlive(enemy._gc))
			.setRelativeTo(enemy, 0, 0)
			.addEvent(0, createProjectionToPlayer(0, 0, 1500));
		master.addEvent(1000 + k * 500, (_) => {
			enemyProjectiles.dispatch(1);
			return REMOVE_EVENT;
		});

		new BoundedProjectile(enemyProjectiles, "orbOrange", 0, 0, 1)
			.dependOn(dependsEnemyAlive(enemy._gc))
			.setRelativeTo(enemy, 0, 0)
			.addEvent(0, createProjectionToPlayer(0, 0, 1500));
		master.addEvent(1500 + k * 500, (_) => {
			enemyProjectiles.dispatch(1);
			return REMOVE_EVENT;
		});

		new BoundedProjectile(enemyProjectiles, "orbOrange", 0, 0, 1)
			.dependOn(dependsEnemyAlive(enemy._gc))
			.setRelativeTo(enemy, 0, 0)
			.addEvent(0, createProjectionToPlayer(0, 0, 1500));
		master.addEvent(2000 + k * 500, (_) => {
			enemyProjectiles.dispatch(1);
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
		let enemy = new Enemy(enemies, "letty", halfWidth, - 50, 30)
			.addEvent(0, createLinearMovement(halfWidth, app.renderer.height / 4, 750))
			.addEvent(3500, createLinearProjection(app.renderer.width, 0, 1000))
			.addEvent(4500, createDestructor());
		master.addEvent(0, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var i = 0; i < 30; i++) {
			new BoundedProjectile(enemyProjectiles, "mediumOrbBlue", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createArcingMovement(halfWidth + 150, halfHeight, halfWidth, app.renderer.height + 1, 1500));
			new BoundedProjectile(enemyProjectiles, "mediumOrbBlue", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createArcingMovement(halfWidth - 150, halfHeight, halfWidth, app.renderer.height + 1, 1500));
			master.addEvent(i * 100, (_) => {
				enemyProjectiles.dispatch(2);
				return REMOVE_EVENT;
			});
			new BoundedProjectile(enemyProjectiles, "mediumOrbLightBlue", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createLinearProjection(halfWidth, app.renderer.height + 1, 1500));
			master.addEvent(i * 100, (_) => {
				enemyProjectiles.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(1000);

	for(var k = 0; k < 4; k++) {
		let left = new Enemy(enemies, "fairyRed", -28, -50, 5)
			.addEvent(300 + 1800 * k, createLinearProjection(halfWidth - 14 * k * xmod, 450, 2500));
		let lMiddle1 = new Enemy(enemies, "fairyGreen", halfWidth - 28, -50, 5)
			.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 100 * k));
		let rMiddle1 = new Enemy(enemies, "fairyBlue", halfWidth + 28, -50, 5)
			.addEvent(900 + 1800 * k, createLinearProjection(app.renderer.width - 150 * xmod, halfHeight + 50 * k, 2500));
		let right = new Enemy(enemies, "fairyGreen", app.renderer.width + 28, -50, 5)
			.addEvent(1200 + 1800 * k, createProjectionToPlayer(0, 0, 2500));
		let rMiddle2 = new Enemy(enemies, "fairyBlue", halfWidth + 28, -50, 5)
			.addEvent(1500 + 1800 * k, createProjectionToPlayer(0, 0, 2500 + 150 * k));
		let lMiddle2 = new Enemy(enemies, "fairyRed", halfWidth - 28, -50, 5)
			.addEvent(1800 + 1800 * k, createProjectionToPlayer(0, 0, 2500));

		for(var i = 1; i <= 6; i++) {
			master.addEvent(0, (_) => {
				enemies.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(1000);

	for (var k = 0; k < 4; k++) {
		let sideOffSet = 25 * (k + 1);
		let leftSide = new Enemy(enemies, "cirno", -28, app.renderer.height + 48, 35)
			.addEvent(0, createLinearMovement(sideOffSet, 32, 1000))
			.addEvent(5000 + k * 200, createLinearProjection(app.renderer.width + 30, 2 * app.renderer.height / 3, 750))
			.addEvent(6000 + k * 200, createDestructor());
		let rightSide = new Enemy(enemies, "cirno", app.renderer.width + 28, app.renderer.height + 48, 35)
			.addEvent(0, createLinearMovement(app.renderer.width - sideOffSet, 32, 1000))
			.addEvent(5000 + k * 200, createLinearProjection(-30, 2 * (app.renderer.width / 3), 750))
			.addEvent(6000 + k * 200, createDestructor());
		let midSide = new Enemy(enemies, "cirno", 30, -20, 35)
			.addEvent(0, createLinearMovement(250 + sideOffSet, 32, 1000))
			.addEvent(5000 + k * 200, createLinearProjection(halfWidth, app.renderer.width, 1000))
			.addEvent(6000 + k * 200, createDestructor());

		new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
			.dependOn(dependsEnemyAlive(leftSide._gc))
			.setRelativeTo(leftSide, 0, 0)
			.addEvent(0, (self) => { self.handle.y += 8; return 10; });
		new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0, 0, 1)
			.dependOn(dependsEnemyAlive(rightSide._gc))
			.setRelativeTo(rightSide, 0, 0)
			.addEvent(0, (self) => { self.handle.y += 8; return 10; });
		new BoundedProjectile(enemyProjectiles, "mediumOrbLightRed", 0 ,0, 1)
			.dependOn(dependsEnemyAlive(midSide._gc))
			.setRelativeTo(midSide, 0, 0)
			.addEvent(0, (self) => { self.handle.y += 8; return 10; });
	}
	master.addEvent(500, (_) => {
		enemies.dispatch(12);
		return REMOVE_EVENT;
	});
	master.addEvent(2500, (_) => {
		enemyProjectiles.dispatch(12);
		return REMOVE_EVENT;
  	});
	master.fragment(6800);

	for(var i = 0; i < 1; i++) {
		let n = 50, theta = 0;
		let enemy = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 50)
			.addEvent(0, createLinearMovement(halfWidth, halfHeight, 1250))
			.addEvent(4000, createArcingMovement(app.renderer.width / 4, app.renderer.height / 4, 0, -50, 1000))
			.addEvent(5000, createDestructor());
		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		//Spawning n projectiles in a circle
		for(var k = 0; k < n; k++){
			theta += 2 * Math.PI / n;
			new BoundedProjectile(enemyProjectiles, "mediumOrbYellowGreen", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 15 * Math.cos(theta), 15 * Math.sin(theta))
				.addEvent(0, createLinearProjection(halfWidth + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 500));
		}
		master.addEvent(2750, (_) => {
			enemyProjectiles.dispatch(n);
			return REMOVE_EVENT;
		});

		//Spawning 36 projectiles in a circle, alternating between small and medium-sized
		for(var k = 0; k < 36; k++){
			theta += 2 * Math.PI / 36;
			if(k % 2 == 0) {
				new BoundedProjectile(enemyProjectiles, "mediumOrbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(enemy._gc))
					.setRelativeTo(enemy, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(halfWidth + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 500));
			}else {
				new BoundedProjectile(enemyProjectiles, "orbGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(enemy._gc))
					.setRelativeTo(enemy, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(halfWidth + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 500));
			}
		}
		master.addEvent(3500, (_) => {
			enemyProjectiles.dispatch(36);
			return REMOVE_EVENT;
		});
	}
	master.fragment(1500);

	for(var k = 0; k < 9; k++) {
		let xSpawn = halfWidth + 350 * xmod;
		let yOffset = 60 + 60 * k;
		let xGenerate = halfWidth + 250 * xmod;
		let leftAndRight = new Enemy(enemies, "cirno", xSpawn, yOffset, 25)
			.addEvent(0, createLinearMovement(xGenerate, yOffset, 500))
			.addEvent(5000, createLinearProjection(halfWidth + 350 * xmod, yOffset, 500))
			.addEvent(6000, createDestructor());
		new BoundedProjectile(enemyProjectiles, "mediumOrbGreen", 0, 0, 1)
			.dependOn(dependsEnemyAlive(leftAndRight._gc))
			.setRelativeTo(leftAndRight, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth - 150 * xmod,  yOffset, 1000));
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
		master.addEvent(3000, (_) => {
			enemyProjectiles.dispatch(1);
			enemyProjectiles.seek(1);
			return REMOVE_EVENT;
		});
	}
	master.fragment(5500);

	for(var k = 0; k < 4; k++) {
		let left = new Enemy(enemies, "fairyRed", -28, 30, 5)
			.addEvent(300 + 1800 * k, createLinearProjection(halfWidth - 14 * k * xmod, 450, 2500));
		let lMiddle1 = new Enemy(enemies, "fairyGreen", -28, halfHeight - 30, 5)
			.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 100 * k));
		let rMiddle1 = new Enemy(enemies, "fairyBlue", app.renderer.width + 28, halfHeight + 30, 5)
			.addEvent(900 + 1800 * k, createLinearProjection(app.renderer.width - 150 * xmod, app.renderer.height - 50 * k, 2500));
		let right = new Enemy(enemies, "fairyGreen", app.renderer.width + 28, 150, 5)
			.addEvent(1200 + 1800 * k, createProjectionToPlayer(0, 0, 2500));
		let rMiddle2 = new Enemy(enemies, "fairyBlue", app.renderer.width + 28, halfHeight - 30, 5)
			.addEvent(1500 + 1800 * k, createProjectionToPlayer(0, 0, 2500 + 150 * k));
		let lMiddle2 = new Enemy(enemies, "fairyRed", -28, halfHeight + 30, 5)
			.addEvent(1800 + 1800 * k, createProjectionToPlayer(0, 0, 2500));

		for(var i = 1; i <= 6; i++) {
			master.addEvent(0, (_) => {
				enemies.dispatch(1);
				return REMOVE_EVENT;
			});
		}
		xmod *= 1;
	}
	master.fragment(1500);

	for(var i = 0; i < 1; i++) {
		let enemy = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 70)
			.addEvent(0, createLinearMovement(halfWidth, halfHeight, 1250))
			.addEvent(5000, createArcingMovement(app.renderer.width / 4, app.renderer.height / 4, 0, -50, 1000))
			.addEvent(6000, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		let theta = 0, xmod = -1;
		for(var k = 0; k < 50; k++) {
			theta += 2*Math.PI / 5;
			new BoundedProjectile(enemyProjectiles, "mediumOrbMagenta", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(100 * k, createSpiralProjection(10, 20, 2000))
				.addEvent(4000, createProjectionToPlayer(xmod * k, 0, 1000));
			xmod *= -1;
			master.addEvent(2500, (_) => {
				enemyProjectiles.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(1500);

	for(var k = 0; k < 3; k++) {
		let topLeft = new Enemy(enemies, "fairyRed", -28, 100, 5)
			.addEvent(200 + 600 * k, createArcingMovement(halfWidth, 15, app.renderer.width + 28, 100, 1500));
		let topRight = new Enemy(enemies, "fairyRed", app.renderer.width + 28, 100, 5)
			.addEvent(200 + 600 * k, createArcingMovement(halfWidth, 15, -28, 150, 1500));
		let midLeft = new Enemy(enemies, "fairyGreen", -28, 150, 5)
			.addEvent(400 + 600 * k, createArcingMovement(halfWidth, 15, app.renderer.width + 28, 150, 1500));
		let midRight = new Enemy(enemies, "fairyGreen", app.renderer.width + 28, 150, 5)
			.addEvent(400 + 600 * k, createArcingMovement(halfWidth, 15, -28, 100, 1500));
		let bottomLeft = new Enemy(enemies, "fairyBlue", -28, 200, 5)
			.addEvent(600 + 600 * k, createArcingMovement(halfWidth, 15, app.renderer.width + 28, 200, 1500));
		let bottomRight = new Enemy(enemies, "fairyBlue", app.renderer.width + 28, 200, 5)
			.addEvent(600 + 600 * k, createArcingMovement(halfWidth, 15, -28, 200, 1500));
		master.addEvent(0, (_) => {
			enemies.dispatch(6);
			return REMOVE_EVENT;
		});

		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(topLeft._gc))
			.setRelativeTo(topLeft, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth + 100 * k, app.renderer.height, 1500));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(topRight._gc))
			.setRelativeTo(topRight, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth - 100 * k, app.renderer.height, 1500));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(midLeft._gc))
			.setRelativeTo(midLeft, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth + 100 * k, app.renderer.height, 1750));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(midRight._gc))
			.setRelativeTo(midRight, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth - 100 * k, app.renderer.height, 1750));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(bottomLeft._gc))
			.setRelativeTo(bottomLeft, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth + 100 * k, app.renderer.height, 2000));
		new BoundedProjectile(enemyProjectiles, "orbLightYellow", 0, 0, 1)
			.dependOn(dependsEnemyAlive(bottomRight._gc))
			.setRelativeTo(bottomRight, 0, 0)
			.addEvent(0, createLinearProjection(halfWidth - 100 * k, app.renderer.height, 2000));
		master.addEvent(750 + 600 * k, (_) => {
			enemyProjectiles.dispatch(6);
			return REMOVE_EVENT;
		});
		xmod *= 1;
	}

	for(var i = 0; i < 1; i++) {
		let left = new Enemy(enemies, "letty", app.renderer.width /2, -100, 70)
			.addEvent(0, createLinearMovement(80, app.renderer.height / 6, 1000))
			.addEvent(3000, createLinearMovement(halfWidth - 100, halfHeight, 1000))
			.addEvent(9000, createLinearMovement(0, app.renderer.height / 6, 500))
			.addEvent(9500, createDestructor());
		let right = new Enemy(enemies, "letty", app.renderer.width /2, -100, 70)
			.addEvent(0, createLinearMovement(app.renderer.width - 80, app.renderer.height / 6, 1000))
			.addEvent(3000, createLinearMovement(halfWidth + 100, halfHeight, 1000))
			.addEvent(9000, createLinearMovement(app.renderer.width, app.renderer.height / 6, 500))
			.addEvent(9500, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(2);
			return REMOVE_EVENT;
		});

		let theta = 0;
		for(var k = 0; k < 80; k++) {
			if(k < 20) {
				theta += 2 * Math.PI / 20;
				new BoundedProjectile(enemyProjectiles, "mediumOrbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(80 + 100 * Math.cos(theta), app.renderer.height / 6 + 100 * Math.sin(theta), 500));
				new BoundedProjectile(enemyProjectiles, "mediumOrbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(80 - 100 * Math.cos(theta), app.renderer.height / 6 - 100 * Math.sin(theta), 500));
				new BoundedProjectile(enemyProjectiles, "mediumOrbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(app.renderer.width - 80 + 100 * Math.cos(theta), app.renderer.height / 6 + 100 * Math.sin(theta), 500));
				new BoundedProjectile(enemyProjectiles, "mediumOrbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(app.renderer.width - 80 - 100 * Math.cos(theta), app.renderer.height / 6 - 100 * Math.sin(theta), 500));

				master.addEvent(2000 + k * 50, (_) => {
					enemyProjectiles.dispatch(4);
					return REMOVE_EVENT;
				});
			}else if(k < 40) {
				new BoundedProjectile(enemyProjectiles, "mediumOrbViolet", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 0, 0)
					.addEvent(0, createLinearProjection((k - 20) * 50, 0, 1500 + 20 * k));
				new BoundedProjectile(enemyProjectiles, "mediumOrbViolet", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 0, 0)
					.addEvent(0, createLinearProjection(app.renderer.width - (k - 20) * 50, 0, 1500 + 20 * k));
				new BoundedProjectile(enemyProjectiles, "mediumOrbViolet", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 0, 0)
					.addEvent(0, createLinearProjection((k - 20) * 50, app.renderer.height, 1500 + 20 * k));
				new BoundedProjectile(enemyProjectiles, "mediumOrbViolet", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 0, 0)
					.addEvent(0, createLinearProjection(app.renderer.width - (k - 20) * 50, app.renderer.height, 1500 + 20 * k));
				master.addEvent(3000 + k * 100, (_) => {
					enemyProjectiles.dispatch(4);
					return REMOVE_EVENT;
				});
			}else{
				theta += 2 * Math.PI / 20;
				new BoundedProjectile(enemyProjectiles, "mediumOrbPink", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(halfWidth - 100 + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 500));
				new BoundedProjectile(enemyProjectiles, "mediumOrbPink", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(halfWidth + 100 + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 500));
				master.addEvent(6500 + k * 10, (_) => {
					enemyProjectiles.dispatch(2);
					return REMOVE_EVENT;
				});
			}
		}
	}
	master.fragment(10500);

	for(var i = 0; i < 1; i++) {
		let enemy = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 35)
			.addEvent(0, createLinearMovement(halfWidth, halfHeight, 1250))
			.addEvent(5000, createArcingMovement(app.renderer.width / 4, app.renderer.height / 4, 0, -50, 1000))
			.addEvent(6000, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		for(var k = 0; k < 10; k++) {
			new BoundedProjectile(enemyProjectiles, "mediumOrbYellow", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createCircularProjection(30, 0, 50, 1000));
			new BoundedProjectile(enemyProjectiles, "mediumOrbYellow", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createCircularProjection(30, -30, 50, 1000));
			new BoundedProjectile(enemyProjectiles, "mediumOrbYellow", 0, 0, 1)
				.dependOn(dependsEnemyAlive(enemy._gc))
				.setRelativeTo(enemy, 0, 0)
				.addEvent(0, createCircularProjection(30, 30, 50, 1000));
			master.addEvent(2250 + k * 50, (_) => {
				enemyProjectiles.dispatch(3);
				return REMOVE_EVENT;
			});
		}
	}
	master.fragment(1500);

	for(var i = 0; i < 1; i++) {
		let left = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 50)
			.addEvent(0, createLinearMovement(80, app.renderer.height / 6, 1000))
			.addEvent(3000, createLinearMovement(halfWidth - 100, halfHeight, 1000))
			.addEvent(9000, createLinearMovement(0, app.renderer.height / 6, 500))
			.addEvent(9500, createDestructor());
		let right = new Enemy(enemies, "cirno", app.renderer.width /2, -100, 50)
			.addEvent(0, createLinearMovement(app.renderer.width - 80, app.renderer.height / 6, 1000))
			.addEvent(3000, createLinearMovement(halfWidth + 100, halfHeight, 1000))
			.addEvent(9000, createLinearMovement(app.renderer.width, app.renderer.height / 6, 500))
			.addEvent(9500, createDestructor());

		master.addEvent(1000, (_) => {
			enemies.dispatch(2);
			return REMOVE_EVENT;
		});

		let theta = 0;
		for(var k = 0; k < 80; k++) {
			theta += 2 * Math.PI / 20;
			if(k < 40) {
				new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 0, 0)
					.addEvent(0, createLinearProjection((k - 20) * 50, 0, 1500 + 20 * k));
				new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 0, 0)
					.addEvent(0, createLinearProjection(app.renderer.width - (k - 20) * 50, 0, 1500 + 20 * k));
				new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 0, 0)
					.addEvent(0, createLinearProjection((k - 20) * 50, app.renderer.height, 1500 + 20 * k));
				new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 0, 0)
					.addEvent(0, createLinearProjection(app.renderer.width - (k - 20) * 50, app.renderer.height, 1500 + 20 * k));
				master.addEvent(3000 + k * 100, (_) => {
					enemyProjectiles.dispatch(4);
					return REMOVE_EVENT;
				});
			}else{
				theta += 2 * Math.PI / 20;
				new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(left._gc))
					.setRelativeTo(left, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(halfWidth - 100 + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 500));
				new BoundedProjectile(enemyProjectiles, "orbYellowGreen", 0, 0, 1)
					.dependOn(dependsEnemyAlive(right._gc))
					.setRelativeTo(right, 15 * Math.cos(theta), 15 * Math.sin(theta))
					.addEvent(0, createLinearProjection(halfWidth + 100 + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 500));
				master.addEvent(6500 + k * 10, (_) => {
					enemyProjectiles.dispatch(2);
					return REMOVE_EVENT;
				});
			}
		}
	}
	master.fragment(10500);

	for(var i = 0; i < 1; i++) {
		let theta = 0, count = 0, travelTime = 2500, ymod = app.renderer.height /6;
		let boss = new Boss(enemies, "chen", halfWidth, -50, 150)
			.addEvent(0, createLinearMovement(halfWidth, app.renderer.height / 5, 750));
		master.addEvent(1000, (_) => {
			enemies.dispatch(1);
			return REMOVE_EVENT;
		});

		//Arbitrary number of projectile waves until it dies
		for(var k = 0; k < 100; k++) {
			travelTime -= 50 * count;
			if(travelTime <= 1000) {
				travelTime = 1000;
			}
			let wave1 = new Enemy(enemies, "fairyRed", app.renderer.width / 3, -50, 5)
				.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 50 * count));
			let wave2 = new Enemy(enemies, "fairyGreen", app.renderer.width / 4, -50, 5)
				.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 50 * count));
			let wave3 = new Enemy(enemies, "fairyBlue", app.renderer.width + 28, app.renderer.height - 200, 5)
				.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 50 * count));
			let wave4 = new Enemy(enemies, "fairyGreen", app.renderer.width * 3 / 4, -50, 5)
				.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 50 * count));
			let wave5 = new Enemy(enemies, "fairyBlue", -28, app.renderer.height - 200, 5)
				.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 50 *  count));
			let wave6 = new Enemy(enemies, "fairyRed", -28, -50, 5)
				.addEvent(600 + 1800 * k, createProjectionToPlayer(0, 0, 2500 - 50 * count));
			master.addEvent(1000 + 1750 * count, (_) => {
					enemies.dispatch(6);
				return REMOVE_EVENT;
			});

			if(count%2 == 0) {
				for(var j = 0; j < 72; j++) {
					theta += 2 * Math.PI / 72;
					new BoundedProjectile(enemyProjectiles, "mediumOrbGreen", 0, 0, 1)
						.dependOn(dependsEnemyAlive(boss._gc))
						.setRelativeTo(boss, 15 * Math.cos(theta + count * Math.PI * 0.6), 15 * Math.sin(theta + count * Math.PI * 0.6))
						.addEvent(0, createLinearProjection(halfWidth + 100 * Math.cos(theta + count * Math.PI * 0.6), app.renderer.height / 5 + 100 * Math.sin(theta + count * Math.PI * 0.6), 750));
				}
				master.addEvent(750 + 1750 * count, (_) => {
					enemyProjectiles.dispatch(72);
					return REMOVE_EVENT;
				});
			} else {
				for(var j = 0; j < 36; j++) {
					theta += 2 * Math.PI / 36;
					new BoundedProjectile(enemyProjectiles, "bigOrbGreen", 0, 0, 1)
						.dependOn(dependsEnemyAlive(boss._gc))
						.setRelativeTo(boss, 15 * Math.cos(theta + count * Math.PI * 0.6), 15 * Math.sin(theta + count * Math.PI * 0.6))
						.addEvent(0, createLinearProjection(halfWidth + 100 * Math.cos(theta + count * Math.PI * 0.6), app.renderer.height / 5 + 100 * Math.sin(theta + count * Math.PI * 0.6), 1000));
				}
				master.addEvent(750 + 1750 * count, (_) => {
					enemyProjectiles.dispatch(36);
					return REMOVE_EVENT;
				});
			}

			if(count%5 == 0) {
				let left = new Enemy(enemies, "letty", app.renderer.width /2, -100, 90)
					.addEvent(0, createLinearMovement(80, app.renderer.height / 6, 1000))
					.addEvent(3000, createLinearProjection(halfWidth - 15, halfHeight, 1000))
				let right = new Enemy(enemies, "letty", app.renderer.width /2, -100, 90)
					.addEvent(0, createLinearMovement(app.renderer.width - 80, app.renderer.height / 6, 1000))
					.addEvent(3000, createLinearProjection(halfWidth + 15, halfHeight, 1000))

				master.addEvent(1750 + 1750 * count, (_) => {
					enemies.dispatch(2);
					return REMOVE_EVENT;
				});

				for(var j = 0; j < 30; j++) {
					if(j < 15) {
						// new BoundedProjectile(enemyProjectiles, "mediumOrbTurquoise", 0, 0, 1)
						// 	.dependOn(dependsEnemyAlive(left._gc))
						// 	.setRelativeTo(left, 0, 0)
						// 	.addEvent(0, createLinearProjection(j * 50, 0, 2250 + 20 * j));
						// new BoundedProjectile(enemyProjectiles, "mediumOrbTurquoise", 0, 0, 1)
						// 	.dependOn(dependsEnemyAlive(right._gc))
						// 	.setRelativeTo(right, 0, 0)
						// 	.addEvent(0, createLinearProjection(app.renderer.width - j * 50, 0, 2250 + 20 * j));
						new BoundedProjectile(enemyProjectiles, "mediumOrbTurquoise", 0, 0, 1)
							.dependOn(dependsEnemyAlive(left._gc))
							.setRelativeTo(left, 0, 0)
							.addEvent(0, createLinearProjection(j * 50, app.renderer.height, 4000 + 50 * j));
						new BoundedProjectile(enemyProjectiles, "mediumOrbTurquoise", 0, 0, 1)
							.dependOn(dependsEnemyAlive(right._gc))
							.setRelativeTo(right, 0, 0)
							.addEvent(0, createLinearProjection(app.renderer.width - j * 50, app.renderer.height, 5000 + 50 * j));
						master.addEvent(2600 + 1750 * count, (_) => {
							enemyProjectiles.dispatch(2);
							return REMOVE_EVENT;
						});
					}else {
						theta += 2 * Math.PI / 10;
						new BoundedProjectile(enemyProjectiles, "mediumOrbPink", 0, 0, 1)
							.dependOn(dependsEnemyAlive(left._gc))
							.setRelativeTo(left, 15 * Math.cos(theta), 15 * Math.sin(theta))
							.addEvent(0, createLinearProjection(halfWidth - 100 + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 1750));
						new BoundedProjectile(enemyProjectiles, "mediumOrbPink", 0, 0, 1)
							.dependOn(dependsEnemyAlive(right._gc))
							.setRelativeTo(right, 15 * Math.cos(theta), 15 * Math.sin(theta))
							.addEvent(0, createLinearProjection(halfWidth + 100 + 100 * Math.cos(theta), halfHeight + 100 * Math.sin(theta), 1750));
						master.addEvent(2300 + 1750 * count, (_) => {
							enemyProjectiles.dispatch(2);
							return REMOVE_EVENT;
						});
					}
				}
			}
			xmod *= 1;
			count++;
		}
	}
}