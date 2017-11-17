
/*
player projectiles need to check if they intersect with enemies
enemy projectiles need to check if they intersect with player
*/

let app;
let animations;
let player;
let allowGameLoop = true;

$(document).ready(() => {
	app = new PIXI.Application();
	$("#game-container").append(app.view);
	app.renderer.backgroundColor = 0x222222;
	app.renderer.resize(600, 600);
});

const REMOVE_EVENT = -1;
const MOVEMENT_SPEED = 4;
const PLAYER_COOLDOWN_READY = 5;
const PLAYER_HITBOX = 4;

//http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=texture-rotate.js&title=Texture%20Rotate
const ROTATE_FLIP_VERTICAL = 12;
const ROTATE_FLIP_HORIZONTAL = 8;

//0, 45, 90, ..., 315
const rotations = [
	0, 7, 6, 5, 4, 3, 2, 1
];
function rotation(rotation) {
	return rotations[Math.floor(rotation / 45)];
}

class Animations {
	constructor() {
		Animations.self = this;
		this.loading = [];
	}

	load(name, nframes, loop, custom) {
		this.loading.push({
			"name": name,
			"nframes": nframes,
			"loop": loop,
			"custom": custom != null ? custom : (_) => {}
		});
		PIXI.loader.add("./res/frames/" + name + ".json", {crossOrigin: ''});
	}

	/**
	 * Delegate to load() for all prefix$k, k being a multiple of 45 in [0,360)
	 */
	loadAllRotations(prefix, nframes, loop, custom) {
		if (custom == null) {
			custom = (_) => {};
		}
		for (var k = 0; k < 360; k += 45) {
			let rotate = rotation(k);
			this.load(prefix + k, nframes, loop, (frame) => {
				custom(frame);
				frame.rotate = rotate;
			});
		}
	}

	execute() {
		PIXI.loader.load((loader, resources) => {
			let current;
			for (var k = 0; k < this.loading.length; k++) {
				current = this.loading[k];
				this[current.name] = {
					"frames": []
				};
				let frame;
				for (var h = 0; h < current.nframes; h++) {
					frame = PIXI.Texture.fromFrame(current.name + h);
					current.custom(frame);
					this[current.name].frames.push(frame);
				}
				this[current.name].loop = current.loop;
			}
		});
	}
}

animations = new Animations();
animations.load("playerIdle", 4, true, null);
animations.load("playerIdleLeft", 7, false, null);
animations.load("playerIdleRight", 7, false, (frame) => {
	frame.rotate = ROTATE_FLIP_VERTICAL;
});

animations.loadAllRotations("projectileKnifeIdle", 1, false, null);
animations.load("projectileFocusIdle", 1, false, null);

animations.load("cirno", 6, true, null);
//stage definition framework--------------------------------------------------

/**
 * Only accurate when called during a frame tick.
 */
function getTimeNow() {
	return PIXI.ticker.shared.lastTime;
}

class GarbageCollector {
	constructor() {
		this.tracking = [];
		this.empty = [];
	}

	track(item) {
		let index = this.empty.pop();
		if (index == undefined) {
			index = this.tracking.length;
		}
		this.tracking[index] = item;
		item._tracking_id = index;
	}

	untrack(item) {
		let index = item._tracking_id;
		this.tracking[index] = null;
		this.empty.push(index);
	}
}

let playerProjectiles = new GarbageCollector();
let enemyProjectiles = new GarbageCollector();

class Entity {
	/**
	 * @param parent Parent Entity object.
	 */
	constructor(parent, frames, x, y) {
		this.events = new GarbageCollector();
		this.gc = new GarbageCollector();
		this.destroyed = false;
		this.frames = frames;
		if (parent != null) {
			this.handle = new PIXI.extras.AnimatedSprite(animations[frames].frames);
			this.handle.loop = animations[frames].loop;
			this.handle.x = x;
			this.handle.y = y;
			this.handle.anchor.set(0.5);
			this.handle.animationSpeed = 0.5;

			this.parent = parent;
			this._stubTrack();
		}
	}

	_stubTrack() {
		this.parent.gc.track(this);
	}

	_stubUntrack() {
		this.parent.gc.untrack(this);
	}

	destroy() {
		if (this.handle != null) {
			app.stage.removeChild(this.handle);
			this.handle.destroy();
		}
		PIXI.ticker.shared.remove(this.onUpdate, this);
		if (this.parent != null) {
			this._stubUntrack();
		}
		this.destroyed = true;
	}

	setRotation(rotation) {
		this.handle.rotate
	}

	/**
	 * @param _ Unused delta parameter required by the ticker.
	 */
	onUpdate(_) {
		let delta = getTimeNow() - this.spawnTime;
		let e;
		for (var k = 0; k < this.events.tracking.length; k++) {
			e = this.events.tracking[k];
			if (e != null) {
				if (e.offset <= delta) {
					let newtime = e.fn(this);
					if (newtime == REMOVE_EVENT) {
						this.events.untrack(e);
						k--;
					} else {
						e.offset = newtime;
					}
				}
			}
		}
	}

	/**
	 * Causes the entity to begin animating and processing events.
	 * The current time is measured here and used as the spawn time.
	 */
	dispatch() {
		this.spawnTime = getTimeNow();
		if (this.handle != null) {
			this.handle.play();
			app.stage.addChild(this.handle);
		}
		PIXI.ticker.shared.add(this.onUpdate, this);
	}

	/**
	 * @param offset How long (in MS) to delay this event for after spawning the entity
	 * @param fn Event function, taking one argument (will be supplied `this`)
	 */
	addEvent(offset, fn) {
		this.events.track({
			"offset": offset,
			"fn": fn
		});
		return this;
	}
}

class Enemy extends Entity {
	constructor(parent, frames, x, y, health) {
		super(parent, frames, x, y);
		this.health = health;
	}

	onCollide(projectile) {
		this.health -= projectile.damage;
		projectile.destroy();
		if (this.health <= 0) {
			this.destroy();
		player.score +=5;
		}
	}
}

class Projectile extends Entity {
	constructor(parent, frames, x, y, damage) {
		super(parent, frames, x, y);
		this.damage = damage;
	}

	_stubTrack() {}
	_stubUntrack() {}

	dispatch(who) {
		this.who = who
		who.track(this)
		super.dispatch()
	}

	destroy() {
		super.destroy()
		this.who.untrack(this);
	}
}

/**
 * A Projectile that destroys itself once it goes outside the game area.
 */
class BoundedProjectile extends Projectile {
	constructor(parent, frames, x, y, damage) {
		super(parent, frames, x, y);
		this.damage = damage;
	}

	onUpdate(_) {
		if (this.handle.x < 0 || this.handle.x > app.renderer.width ||
			this.handle.y < 0 || this.handle.y > app.renderer.height) {
			this.destroy();
		} else {
			super.onUpdate(_);
		}
	}
}

//end stage definition framework----------------------------------------------

class Player {
	constructor() {
		this.health = 1;
		this.shootCooldown = 0;
		this.gc = new GarbageCollector();
		this.score = 0;

		this.handle = new PIXI.extras.AnimatedSprite(animations["playerIdle"].frames);
		this.handle.loop = animations["playerIdle"].loop;
		this.handle.x = app.renderer.width / 2;
		this.handle.y = app.renderer.height / 2;
		this.handle.anchor.set(0.5);
		this.handle.animationSpeed = 0.5;
		this.handle.play();
		app.stage.addChild(this.handle);
	}

	runAnimation(name) {
		if (this.currentAnim != name) {
			this.currentAnim = name;
			this.handle.textures = animations[name].frames;
			this.handle.loop = animations[name].loop;
			this.handle.gotoAndPlay(0);
		}
	}

	move(x, y) {
		let minx = this.handle.width / 2;
		let maxx = app.renderer.width - minx;
		let miny = this.handle.height / 2;
		let maxy = app.renderer.height - miny;

		this.handle.x += x;
		this.handle.y += y;

		if (this.handle.x < minx) {
			this.handle.x = minx;
		} else if (this.handle.x > maxx) {
			this.handle.x = maxx;
		}
		if (this.handle.y < miny) {
			this.handle.y = miny;
		} else if (this.handle.y > maxy) {
			this.handle.y = maxy;
		}
	}

	shoot(focus) {
		if (this.shootCooldown < PLAYER_COOLDOWN_READY) {
			player.shootCooldown++;
		} else {
			player.shootCooldown = 0;
			if (focus) {
				new BoundedProjectile(MASTER, "projectileFocusIdle", this.handle.x, this.handle.y, 3).addEvent(0, function(self) {
					self.handle.y -= 4;
					return true;
				}).dispatch(playerProjectiles);
			} else {
				let trio = [
					new BoundedProjectile(MASTER, "projectileKnifeIdle315", this.handle.x - 10, this.handle.y, 1),
					new BoundedProjectile(MASTER, "projectileKnifeIdle0", this.handle.x, this.handle.y, 1),
					new BoundedProjectile(MASTER, "projectileKnifeIdle45", this.handle.x + 10, this.handle.y, 1)
				];
				trio[0].addEvent(0, function(self) {
					self.handle.x -= 1;
					self.handle.y -= 3;
					return 80;
				});
				trio[1].addEvent(0, function(self) {
					self.handle.y -= 4;
					return 80;
				});
				trio[2].addEvent(0, function(self) {
					self.handle.x += 1;
					self.handle.y -= 3;
					return 80;
				});
				for (var k = 0; k < 3; k++) {
					trio[k].dispatch(playerProjectiles);
				}
			}
		}
	}

	onCollide(projectile) {
		this.health -= projectile.damage;
		projectile.destroy();
		if (this.health <= 0) {
			console.log("You died.");
			console.log("You scored",player.score,"points!");
			allowGameLoop = false;
		}
	}
}

const VK_X = 88; //bomb
const VK_Z = 90; //shoot (can hold)
const VK_ESC = 27; //pause
const VK_SHIFT = 16; //slow/focus
const VK_UP = 38;
const VK_DOWN = 40;
const VK_LEFT = 37;
const VK_RIGHT = 39;
const VK_W = 87;
const VK_A = 65;
const VK_S = 83;
const VK_D = 68;
let keys = {};

window.addEventListener("keydown", (e) => {
	keys[e.keyCode] = true;
	keys[VK_SHIFT] = e.shiftKey;
});
window.addEventListener("keyup", (e) => {
	keys[e.keyCode] = false;
	keys[VK_SHIFT] = e.shiftKey;
});

animations.execute();
PIXI.loader.onComplete.add(() => {
	player = new Player();

	app.ticker.add(() => {
		if (!allowGameLoop) {
			return;
		}

		let xdir = 0;
		let ydir = 0;
		if ((keys[VK_UP] || keys[VK_W]) && ydir == 0) {
			ydir = -1;
		}
		if ((keys[VK_LEFT] || keys[VK_A]) && xdir == 0) {
			xdir = -1;
		}
		if ((keys[VK_RIGHT] || keys[VK_D]) && xdir == 0) {
			xdir = 1;
		}
		if ((keys[VK_DOWN] || keys[VK_S]) && ydir == 0) {
			ydir = 1;
		}
		if (xdir < 0) {
			player.runAnimation("playerIdleLeft");
		} else if (xdir > 0) {
			player.runAnimation("playerIdleRight");
		} else {
			player.runAnimation("playerIdle");
		}
		player.move(xdir * MOVEMENT_SPEED, ydir * MOVEMENT_SPEED);

		if (keys[VK_Z]) {
			player.shoot(keys[VK_SHIFT]);
		}

		for (var k = 0; k < playerProjectiles.tracking.length; k++) {
			let projectile = playerProjectiles.tracking[k];
			if (projectile != null) {
				for (var h = 0; h < MASTER.gc.tracking.length; h++) {
					if (MASTER.gc.tracking[h] != null && MASTER.gc.tracking[h] instanceof Enemy) {
						let enemy = MASTER.gc.tracking[h];
						if (projectile.handle.x >= enemy.handle.x - 10 && projectile.handle.x <= enemy.handle.x + 10 &&
							projectile.handle.y >= enemy.handle.y - 10 && projectile.handle.y <= enemy.handle.y + 10) {
								enemy.onCollide(projectile);
								break;
						}
					}
				}
			}
		}
		for (var k = 0; k < enemyProjectiles.tracking.length; k++) {
			let projectile = enemyProjectiles.tracking[k];
			if (projectile != null) {
				if (projectile.handle.x >= player.handle.x - PLAYER_HITBOX && projectile.handle.x <= player.handle.x + PLAYER_HITBOX &&
					projectile.handle.y >= player.handle.y - PLAYER_HITBOX && projectile.handle.y <= player.handle.y + PLAYER_HITBOX) {
					player.onCollide(projectile);
					break;
				}
			}
		}
		//TODO add player colliding with enemies. 1 damage
	});
});
