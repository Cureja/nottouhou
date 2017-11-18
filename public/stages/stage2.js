
//subterranean animism, stage 1, normal

function initializeStage() {
	for (var k = 0; k < 3; ++k) {
		let off = 32 * (k + 1);
		let left = new Enemy(enemies, "playerIdle", -32, app.renderer.height + 48, 5)
			.addEvent(0, createLinearMovement(off, 32, 1000))
			.addEvent(4500 + k * 250, createLinearProjection(app.renderer.width + 32, app.renderer.height / 2, 1000))
			.addEvent(5500 + k * 250, createDestructor());
		let right = new Enemy(enemies, "playerIdle", app.renderer.width + 32, app.renderer.height + 48, 5)
			.addEvent(0, createLinearMovement(app.renderer.width - off, 32, 1000))
			.addEvent(4500 + k * 250, createLinearProjection(-32, app.renderer.height / 2, 1000))
			.addEvent(5500 + k * 250, createDestructor());;
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
	master.fragment(4500);

	let halfWidth = app.renderer.width / 2;

	for (var k = 0, index = 5, dir = 1; k < 20; k++) {
		let enemy = new Enemy(enemies, "playerIdle", app.renderer.width / 2, -48, 5)
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
	master.fragment(10000);
}
