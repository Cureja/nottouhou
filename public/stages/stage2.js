
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
		});

		if (index == 9) {
			dir = -1;
		} else if (index == 0) {
			dir = 1;
		}
		index += dir;
	}
	master.fragment(14000);

	for(var k = 0; k < 4; k++) {
		let off = 28 * (k + 1);
		let left = new Enemy(enemies, "fairyRed", -28, -50, 5)
			.addEvent(300 + 1800 * k, createProjectionToPlayer(2500));
		let lMiddle1 = new Enemy(enemies, "fairyGreen", app.renderer.width / 2 - 28, -50, 5)
			.addEvent(600 + 1800 * k, createProjectionToPlayer(2500));
		let rMiddle1 = new Enemy(enemies, "fairyBlue", app.renderer.width / 2 + 28, -50, 5)
			.addEvent(900 + 1800 * k, createProjectionToPlayer(2500));
		let right = new Enemy(enemies, "fairyGreen", app.renderer.width + 28, -50, 5)
			.addEvent(1200 + 1800 * k, createProjectionToPlayer(2500));
		let rMiddle2 = new Enemy(enemies, "fairyBlue", app.renderer.width / 2 + 28, -50, 5)
			.addEvent(1500 + 1800 * k, createProjectionToPlayer(2500));
		let lMiddle2 = new Enemy(enemies, "fairyRed", app.renderer.width / 2 - 28, -50, 5)
			.addEvent(1800 + 1800 * k, createProjectionToPlayer(2500));

		for(var i = 1; i <= 6; i++) {
			master.addEvent(i * 300 + k * 1800 , (_) => {
				enemies.dispatch(1);
				return REMOVE_EVENT;
			});
		}
	}

	master.fragment(6000);
}
