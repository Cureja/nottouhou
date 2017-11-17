
//NOTE THAT YOU CANNOT USE THE SAME EVENT WITH MULTIPLE ENTITIES AT ONCE

//DEPENDENCIES------------------------------------------------------------------

function enemyAlive(index) { //helper
	let enemy = enemies.get(index);
	return enemy !== null && !enemy.destroyed;
}

function dependsEnemyAlive(index) {
	return (_) => {
		return enemyAlive(index);
	};
}

function projectileAlive(index) { //helper
	let projectile = enemyProjectiles.get(index);
	return projectile !== null && !projectile.destroyed;
}

function dependsProjectileAlive(index) {
	return (_) => {
		return projectileAlive(index);
	}
}

//END DEPENDENCIES--------------------------------------------------------------

//EVENTS------------------------------------------------------------------------

/**
 * Creates a movement event that moves an entity in a line.
 */
function createLinearMovement(toX, toY, overMS) {
	return (entity) => {
		let fromX = entity.handle.x;
		let fromY = entity.handle.y;
		let startTime = getTimeNow();
		let event = (entity) => {
			let diff = getTimeNow() - startTime;
			if (diff >= overMS) {
				entity.handle.x = toX;
				entity.handle.y = toY;
				return REMOVE_EVENT;
			}
			entity.handle.x = fromX + (toX - fromX) * (diff / overMS);
			entity.handle.y = fromY + (toY - fromY) * (diff / overMS);
			return 10;
		};
		entity.mutateEvent(event);
		return event(entity);
	};
}

/**
 * Creates a movement event that moves an entity in a line.
 * The line begins at the entities location, passes through midX,midY, and has no end.
 * This event should be wrapped by another that checks bounds (or applied to a BoundedProjectile).
 */
function createLinearProjection(midX, midY, overMS) {
	return (entity) => {
		let fromX = entity.handle.x;
		let fromY = entity.handle.y;
		let startTime = getTimeNow();
		let event = (entity) => {
			let diff = getTimeNow() - startTime;
			entity.handle.x = fromX + (midX - fromX) * (diff / overMS);
			entity.handle.y = fromY + (midY - fromY) * (diff / overMS);
			return 10;
		};
		entity.mutateEvent(event);
		return event(entity);
	};
}

function createProjectionToPlayer(overMS) {
	return (entity) => {
		return createLinearProjection(player.handle.x, player.handle.y, overMS)(entity);
	}
}

function createDestructor() {
	return (entity) => {
		entity.destroy();
		return REMOVE_EVENT;
	};
}

//END EVENTS--------------------------------------------------------------------
