
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
 * The line begins at the entity's location, passes through midX,midY, and has no end.
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

/**
* Creates a movement event that moves an entity in an arc.
* The line will be a Bezier Curve with curveX,curveY as a "pull" on your begin and end coordinates
*/
function createArcingMovement(curveX, curveY, toX, toY, overMS) {
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
			entity.handle.x = (1 - (diff / overMS))**2 * fromX + 2*(1 - (diff / overMS))*(diff / overMS) * curveX + (diff / overMS)**2 * toX;
			entity.handle.y = (1 - (diff / overMS))**2 * fromY + 2*(1 - (diff / overMS))*(diff / overMS) * curveY + (diff / overMS)**2 * toY;
			return 10;
		};
		entity.mutateEvent(event);
		return event(entity);
	}
}

/**
* NOT SURE IF THIS WORKS YET
* Creates a movement event that moves an entity in a spiral.
* The circle begins with a radius of startRadius, and expands by a percentage of midRadius.
*/
function createSpiralMovement(curveX, curveY, toX, toY, overMS) {
	return (entity) => {
		let fromX = entity.handle.x;
		let fromY = entity.handle.y;
		let startTime = getTimeNow();
		let event = (entity) => {
			let diff = getTimeNow() - startTime;
			let theta = 360 * (diff / overMS);
			if (diff >= overMS) {
				entity.handle.x = toX;
				entity.handle.y = toY;
				return REMOVE_EVENT;
			}
			entity.handle.x = fromY + startRadius * (midRadius * (diff / overMS)) * Math.cos(theta);
			entity.handle.y = fromX + startRadius * (midRadius * (diff / overMS)) * Math.sin(theta);
			return 10;
		};
		entity.mutateEvent(event);
		return event(entity);
	}
}

/**
* NOT SURE IF THIS WORKS YET
* Creates a movement event that moves an entity in a spiral.
* The circle begins with a radius of startRadius, and expands by a percentage of midRadius with no end.
* This event should be wrapped by another that checks bounds (or applied to a BoundedProjectile).
*/
function createSpiralProjection(startRadius, midRadius, overMS) {
	return (entity) => {
		let fromX = entity.handle.x;
		let fromY = entity.handle.y;
		let startTime = getTimeNow();
		let event = (entity) => {
			let diff = getTimeNow() - startTime;
			let theta = 360 * (diff / overMS);
			entity.handle.x = fromY + startRadius * (midRadius * (diff / overMS)) * Math.cos(theta);
			entity.handle.y = fromX + startRadius * (midRadius * (diff / overMS)) * Math.sin(theta);
			return 10;
		}
		entity.mutateEvent(event);
		return event(entity);
	}
}

/**
* PROBABLY DOESN'T WORK AS INTENDED IF AT ALL
* Creates a movement event that moves an entity in a circle of set radius.
* The circle will move to (midX, midY) as it rotates
* To guarantee that it stays on the same Y axis as before, make sure toX is a multiple of 2 * radius.
*/
function createCircularMovement(radius, toX, toY, overMS) {
	return (entity) => {
		let fromX = entity.handle.x;
		let fromY = entity.handle.y;
		let startTime = getTimeNow();
		let event = (entity) => {
			let diff = getTimeNow() - startTime;
			if (diff >= overMS) {
				entity.handle.x = toX + radius * Math.cos(theta);
				entity.handle.y = toY + radius * Math.sin(theta);
				return REMOVE_EVENT;
			}
			entity.handle.x = fromY + radius * Math.cos(theta) + toX * (diff / overMS);
			entity.handle.y = fromX + radius * Math.sin(theta) + toY * (diff / overMS);
			return 10;
		}
		entity.mutateEvent(event);
		return event(entity);
	}
}

/**
* PROBABLY DOESN'T WORK AS INTENDED IF AT ALL
* Creates a movement event that moves an entity in a circle of set radius.
* The circle will move to (midX, midY) as it rotates
* This event should be wrapped by another that checks bounds (or applied to a BoundedProjectile).
*/
function createCircularProjection(radius, midX, midY, overMS) {
	return (entity) => {
		let fromX = entity.handle.x;
		let fromY = entity.handle.y;
		let startTime = getTimeNow();
		let event = (entity) => {
			let diff = getTimeNow() - startTime;
			entity.handle.x = fromY + radius * Math.cos(theta) + midX * (diff / overMS);
			entity.handle.y = fromX + radius * Math.sin(theta) + midY * (diff / overMS);
			return 10;
		}
		entity.mutateEvent(event);
		return event(entity);
	}
}



function createDestructor() {
	return (entity) => {
		entity.destroy();
		return REMOVE_EVENT;
	};
}

//END EVENTS--------------------------------------------------------------------
