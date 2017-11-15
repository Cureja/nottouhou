
/**
 * Creates a movement event that moves an entity in a line.
 */
function createLinearMovement(fromX, fromY, toX, toY, overMS) {
	return (entity) => {
		let diff = getTimeNow() - entity.spawnTime;
		if (diff >= overMS) {
			entity.handle.x = toX;
			entity.handle.y = toY;
			return REMOVE_EVENT;
		}
		entity.handle.x = fromX + (toX - fromX) * (diff / overMS);
		entity.handle.y = fromY + (toY - fromY) * (diff / overMS);
		return 10;
	};
}

/**
 * Creates a movement event that moves an entity in a line.
 * The line begins at fromX,fromY, passes through midX,midY, and has no end.
 * This event should be wrapped by another that checks bounds (or applied to a BoundedProjectile).
 */
function createLinearProjection(fromX, fromY, midX, midY, overMS) {
	return (entity) => {
		let diff = getTimeNow() - entity.spawnTime;
		entity.handle.x = fromX + (midX - fromX) * (diff / overMS);
		entity.handle.y = fromY + (midY - fromY) * (diff / overMS);
		return 10;
	};
}
