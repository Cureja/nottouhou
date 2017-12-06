
//https://github.com/google/closure-compiler

let app;
let animations;
let player;
let allowGameLoop = true;
let stageN;

$(document).ready(() => {
	app = new PIXI.Application();
	$("#game-container").append(app.view);
	app.renderer.backgroundColor = 0x222222;
	app.renderer.resize(600, 600);
})

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

	clear() {
		this.loading = [];
	}
}

animations = new Animations();
animations.load("playerIdle", 4, true, null);
animations.load("playerIdleLeft", 7, false, null);
animations.load("playerIdleRight", 7, false, (frame) => {
	frame.rotate = ROTATE_FLIP_VERTICAL;
});

animations.load("cirno", 4, true, null);
animations.load("letty", 4, true, null);
animations.load("chen", 4, true, null);
animations.load("yuyu", 3, true, null);
animations.load("fairyBlue", 8, true, null);
animations.load("fairyRed", 8, true, null);
animations.load("fairyGreen", 8, true, null);

animations.loadAllRotations("projectileKnifeIdle", 1, false, null);
animations.load("projectileFocusIdle", 1, false, null);
animations.loadAllRotations("projectileIce", 1, false, null);

animations.load("orbBlack", 1, false, null);
animations.load("orbBlue", 1, false, null);
animations.load("orbGreen", 1, false, null);
animations.load("orbGrey", 1, false, null);
animations.load("orbLightBlue", 1, false, null);
animations.load("orbLightGreen", 1, false, null);
animations.load("orbLightPurple", 1, false, null);
animations.load("orbLightRed", 1, false, null);
animations.load("orbLightYellow", 1, false, null);
animations.load("orbMagenta", 1, false, null);
animations.load("orbOrange", 1, false, null);
animations.load("orbPink", 1, false, null);
animations.load("orbPurple", 1, false, null);
animations.load("orbRed", 1, false, null);
animations.load("orbYellow", 1, false, null);
animations.load("orbYellowGreen", 1, false, null);
animations.load("mediumOrbBlack", 1, false, null);
animations.load("mediumOrbBlue", 1, false, null);
animations.load("mediumOrbGreen", 1, false, null);
animations.load("mediumOrbGrey", 1, false, null);
animations.load("mediumOrbLightBlue", 1, false, null);
animations.load("mediumOrbLightGreen", 1, false, null);
animations.load("mediumOrbLightRed", 1, false, null);
animations.load("mediumOrbLightYellow", 1, false, null);
animations.load("mediumOrbMagenta", 1, false, null);
animations.load("mediumOrbOrange", 1, false, null);
animations.load("mediumOrbPink", 1, false, null);
animations.load("mediumOrbRed", 1, false, null);
animations.load("mediumOrbTurquoise", 1, false, null);
animations.load("mediumOrbViolet", 1, false, null);
animations.load("mediumOrbYellow", 1, false, null);
animations.load("mediumOrbYellowGreen", 1, false, null);
animations.load("bigOrbBlack", 1, false, null);
animations.load("bigOrbBlue", 1, false, null);
animations.load("bigOrbGreen", 1, false, null);
animations.load("bigOrbGrey", 1, false, null);
animations.load("bigOrbLightBlue", 1, false, null);
animations.load("bigOrbPink", 1, false, null);
animations.load("bigOrbRed", 1, false, null);
animations.load("bigOrbYellow", 1, false, null);

function getTimeNow() {
	return Date.now();
}

class List {
	constructor(capacity) {
		if (typeof(capacity) === "undefined") {
			capacity = 0;
		}
		this.length = 0;
		this.capacity = capacity;
		this.self = new Array(capacity);
		for (var k = 0; k < capacity; ++k) {
			this.self[k] = null;
		}
	}

	get(index) {
		return this.self[index];
	}

	size() {
		return this.length;
	}

	set(index, value) {
		this.self[index] = value;
	}

	push(value) {
		if (this.length === this.capacity) {
			this.self = this.self.concat(new Array(this.capacity));
		}
		this.self[this.length] = value;
		this.capacity *= 2;
		return this.length++;
	}

	pop(value) {
		if (this.length == 0) {
			return null;
		}
		let ret = this.self[--this.length];
		this.self[this.length] = null;
		return ret;
	}

	trim() {
		this.self = this.self.slice(0,this.length);
		console.log(this.self);
	}

	clear() {
		for (var k = 0, length = this.length; k < length; ++k) {
			this.self[k] = null;
		}
	}
}

let spectate = false;
let replay = new List(100);
function input(replayIn, spectateIn, followIn) {
	let replayI = replayIn;
	if(new String(replayI).trim() !== new String("false").trim() ) {
		console.log("redead");
		deathReplay = true;
		replay.self = JSON.parse(replayI);
		replay.length = replay.self.length;
		deathTime = replay.pop();
		console.log("redead");
	} else {
		replay = new List(100);
		for(i=0; i<7; i++) {
			pastAct[i] = false;
		}
	}
	spectate = spectateIn;
	if(spectate !== false && spectate !==-1) {
		skipTime = spectate;
		console.log("spdead");
		deathReplay = true;
		window.removeEventListener("keydown", (e) => {
			keys[e.keyCode] = true;
			keys[VK_SHIFT] = e.shiftKey;
		});
		window.removeEventListener("keyup", (e) => {
			keys[e.keyCode] = false;
			keys[VK_SHIFT] = e.shiftKey;
		});
	}
	follow = followIn;
}

class GarbageCollector extends List {
	constructor() {
		super();
		this.empty = new List();
	}

	track(item) {
		let index = this.empty.pop();
		if (index === null) {
			index = this.push(item);
		} else {
			this.set(index, item);
		}
		item._gc = index;
	}

	untrack(item) {
		let index = item._gc;
		this.set(index, null);
		this.empty.push(index);
	}

	clear() {
		super.clear();
		this.empty.clear();
	}
}

let TRUE_PREDICATE = (_) => { return true; };
let FALSE_PREDICATE = (_) => { return false; };

class Dispatcher extends GarbageCollector {
	constructor(capacity) {
		super(capacity);
		this.index = 0;
	}

	/**
	 * Dispatches `count` entities.
	 */
	dispatch(count) {
		for (var length = this.index + count; this.index < length; ++this.index) {
			this.get(this.index).dispatch();
		}
	}

	/**
	 * Adjusts the index by `count`.
	 */
	seek(count) {
		this.index += count;
	}

	/**
	 * Dispatches `count` entities with false dependencies,
	 * causing them to destroy themselves.
	 */
	ignore(count) {
		for (var length = this.index + count; this.index < length; ++this.index) {
			this.get(this.index).dependOn(FALSE_PREDICATE).dispatch();
		}
	}
}

let playerProjectiles = new Dispatcher();
let enemyProjectiles = new Dispatcher();
let enemies = new Dispatcher();

const EVENT_TIME = 0;
const EVENT_FN = 1;
class Entity {
	constructor(tracker, frames, x, y) {
		this.tracker = tracker;
		this.dependency = TRUE_PREDICATE;
		this.currentEvent = null;
		if (tracker !== null) { //if not master
			this.tracker.track(this);
			this.frames = frames;

			let anim = animations[frames];
			this.handle = new PIXI.extras.AnimatedSprite(anim.frames);
			this.handle.loop = anim.loop;
			this.handle.x = x;
			this.handle.y = y;
			this.handle.anchor.set(0.5);
			this.handle.animationSpeed = 0.5;
		}
		this.events = new GarbageCollector();
		this.destroyed = false;
		this.dispatched = false;
	}

	ensureAlive() {
		if (this.tracker !== null && this.handle.transform === null) {
			this.destroy();
			return false;
		}
		return true;
	}

	destroy() {
		this.destroyed = true;
		if (this.tracker != null) { //if not master
			this.tracker.untrack(this);
			app.stage.removeChild(this.handle);
			this.handle.destroy();
		}
	}

	onUpdate(_) {
		if (this.destroyed || !this.ensureAlive()) {
			return;
		}
		let delta = getTimeNow() - this.spawnTime;
	 	if (this.tracker === null) {
	 		delta += skipTime;
	 	}
		let e;
		for (var k = 0, length = this.events.length; k < length; ++k) {
			e = this.events.get(k);
			if (e !== null && e[EVENT_TIME] <= delta) {
				this.currentEvent = e;
				let newtime = e[EVENT_FN](this);
				if (newtime === REMOVE_EVENT) {
					this.events.untrack(e);
				} else {
					e[EVENT_TIME] = delta + newtime;
				}
			}
		}
	}

	mutateEvent(fn) {
		this.currentEvent[EVENT_FN] = fn;
		return this;
	}

	dispatch() {
		if (!this.dependency(this)) {
			//no checking for master as it can't fail the dependency test
			this.handle.destroy();
			return;
		}
		if (this.tracker != null) {
			this.handle.play();
			app.stage.addChild(this.handle);
		}
		this.spawnTime = getTimeNow();
	}

	addEvent(offset, fn) {
		this.events.track([offset, fn]);
		return this;
	}

	dependOn(dependency) {
		this.dependency = dependency;
		return this;
	}
}

class Master extends Entity {
	constructor() {
		super(null, null, 0, 0);
		this.fragmentTime = 0;
	}

	destroy() {
		PIXI.ticker.shared.remove(this.onUpdate, this);
		super.destroy();
		let e;
		for (var k = 0, length = enemyProjectiles.length; k < length; ++k) {
			e = enemyProjectiles.get(k);
			if (e !== null) {
				e.destroy();
			}
		}
		for (var k = 0, length = playerProjectiles.length; k < length; ++k) {
			e = playerProjectiles.get(k);
			if (e !== null) {
				e.destroy();
			}
		}
		for (var k = 0, length = enemies.length; k < length; ++k) {
			e = enemies.get(k);
			if (e !== null) {
				e.destroy();
			}
		}
		enemyProjectiles.clear();
		playerProjectiles.clear();
		enemies.clear();
	}

	dispatch() {
		super.dispatch();
		PIXI.ticker.shared.add(this.onUpdate, this);
	}

	addEvent(offset, fn) {
		super.addEvent(offset + this.fragmentTime, fn);
	}

	fragment(time) {
		this.fragmentTime += time;
		console.log("fragment at " + this.fragmentTime);
	}

	onUpdate(_) {
		super.onUpdate(_);
		if (this.destroyed) {
			return;
		}
		let e;
		for (var k = 0, length = enemies.length; k < length; ++k) {
			e = enemies.get(k);
			if (e !== null) {
				e.onUpdate(_);
			}
		}
		for (var k = 0, length = enemyProjectiles.length; k < length; ++k) {
			e = enemyProjectiles.get(k);
			if (e !== null) {
				e.onUpdate(_);
			}
		}
		for (var k = 0, length = playerProjectiles.length; k < length; ++k) {
			e = playerProjectiles.get(k);
			if (e !== null) {
				e.onUpdate(_);
			}
		}
	}

}
let skipTime = 0;
let master = new Master();

//enemies should generally have their parents set to the master
class Enemy extends Entity {
	constructor(tracker, frames, x, y, health, points = health) {
		super(tracker, frames, x, y);
		this.health = health;
		this.points = points;
		this.damage = 1;
	}

	onCollide(projectile) {
		this.health -= projectile.damage;
		projectile.destroy();
		if (this.health <= 0) {
			player.score += this.points;
			this.destroy();
		}
	}

	addEvent(offset, fn) {
		if (master.fragmentTime >= skipTime) {
			super.addEvent(offset, fn);
		}
		else {
			super.addEvent(offset, (_) => {
			return REMOVE_EVENT;
			});
		}
		return this;
	}

	destroy() {
		super.destroy();
	}
}

class Boss extends Enemy {
	constructor(tracker, frames, x, y, health) {
		super(tracker, frames, x, y, health);
	}

	onCollide(projectile) {
		this.health -= projectile.damage;
		projectile.destroy();
		if (this.health <= 0) {
			player.score += this.points;
			this.destroy();

			var winText = new PIXI.Text('You won! ', {fontFamily : "Arial", fontSize :16, fill: '#FFFFFF'});
			winText.x = app.renderer.width / 2 - 35;
			winText.y = app.renderer.height / 2;
			app.stage.addChild(winText);

			player.die();
		}
	}
}

//projectiles have their parents set to either enemyProjectiles or playerProjectiles
class Projectile extends Entity {
	constructor(tracker, frames, x, y, damage) {
		super(tracker, frames, x, y);
		this.damage = damage;
	}

	setRelativeTo(entity, xoff, yoff) {
		this.addEvent(0, (self) => {
			if (entity.destroyed) {
				self.mutateEvent(createDestructor());
				return 0;
			}
			self.handle.x = entity.handle.x + xoff;
			self.handle.y = entity.handle.y + yoff;
			return REMOVE_EVENT;
		});
		return this;
	}

	addEvent(offset, fn) {
		if (master.fragmentTime >= skipTime) {
			super.addEvent(offset, fn);
		}else {
			super.addEvent(offset, (_) => {
			return REMOVE_EVENT;
		});
		}
		return this;
	}
}

class BoundedProjectile extends Projectile {
	constructor(tracker, frames, x, y, damage) {
		super(tracker, frames, x, y, damage);
	}

	onUpdate(_) {
		if (!this.destroyed && this.ensureAlive() && (this.handle.x < 0 || this.handle.x > app.renderer.width ||
			this.handle.y < 0 || this.handle.y > app.renderer.height)) {
			this.destroy();
		} else {
			super.onUpdate(_);
		}
	}

}

class Player {
	constructor() {
		this.health = 1;
		this.shootCooldown = 0;
		this.gc = new GarbageCollector();
		this.score = 0;
		this.destroyed = false;

		this.handle = new PIXI.extras.AnimatedSprite(animations["playerIdle"].frames);
		this.handle.loop = animations["playerIdle"].loop;
		this.handle.x = app.renderer.width / 2;
		this.handle.y = app.renderer.height - 64;
		this.handle.anchor.set(0.5);
		this.handle.animationSpeed = 0.5;
		this.handle.play();
		app.stage.addChild(this.handle);
	}

	runAnimation(name) {
		 if (!this.destroyed && this.currentAnim != name) {
			this.currentAnim = name;
			this.handle.textures = animations[name].frames;
			this.handle.loop = animations[name].loop;
			this.handle.gotoAndPlay(0);
		}
	}

	getLocation() {
		return {x:this.handle.x, y:this.handle.y};
	}

	setLocation(loc) {
		this.handle.x = loc.x;
		this.handle.y = loc.y;
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
		if (focus) {
			new BoundedProjectile(playerProjectiles, "projectileFocusIdle", this.handle.x, this.handle.y, 3).addEvent(0, (self) => {
				self.handle.y -= 7;
				return 10;
			}).dispatch(playerProjectiles);
			player.shootCooldown = PLAYER_COOLDOWN_READY;
		} else {
			let trio = [
				new BoundedProjectile(playerProjectiles, "projectileKnifeIdle315", this.handle.x - 10, this.handle.y, 2).addEvent(0, (self) => {
					self.handle.x -= 1;
					self.handle.y -= 7;
					return 10;
				}),
				new BoundedProjectile(playerProjectiles, "projectileKnifeIdle0", this.handle.x, this.handle.y, 2).addEvent(0, (self) => {
					self.handle.y -= 7;
					return 10;
				}),
				new BoundedProjectile(playerProjectiles, "projectileKnifeIdle45", this.handle.x + 10, this.handle.y, 2).addEvent(0, (self) => {
					self.handle.x += 1;
					self.handle.y -= 7;
					return 10;
				})
			];
			for (var k = 0; k < 3; k++) {
				trio[k].dispatch(playerProjectiles);
			}
			player.shootCooldown = PLAYER_COOLDOWN_READY;
		}
	}

	onCollide(projectile) {
		if(!deathReplay) {
			this.health -= projectile.damage;
			projectile.destroy();
		}
		if (this.health <= 0) {
			this.die();
		}
	}

	die() {
		deathTime = getTimeNow() - startTime;
		master.destroy();
		if(!deathReplay) {
			deathReplay = true;
			//console.log("You died.");
			console.log("You scored", player.score, "points!");
			console.log();
			$.post("/highscores",{score: player.score});
			console.log(stageN);
			replay.trim();
			replay.push(deathTime);
			$.post("/postreplay",{'events': JSON.stringify(replay.self), stage: stageN});
			master = new Master();
			animations.clear();
			app.stage.removeChild(player.handle)
			playerProjectiles = new Dispatcher();
			enemyProjectiles = new Dispatcher();
			enemies = new Dispatcher();
			player = new Player()
			PIXI.ticker.shared.add(this.onUpdate, this);
			for(i=0; i<7; i++) {
				pastAct[i] = false;
			}
			for(x in keysUsed) {
				keys[keysUsed[x]] = false;
			}
			window.removeEventListener("keydown", (e) => {
				keys[e.keyCode] = true;
				keys[VK_SHIFT] = e.shiftKey;
			});
			window.removeEventListener("keyup", (e) => {
				keys[e.keyCode] = false;
				keys[VK_SHIFT] = e.shiftKey;
			});
			initializeStage();
			startTime = getTimeNow();
			master.dispatch();
		}
		else {
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
let keysUsed = [88,90,27,16,38,40,37,39,87,65,83,68];
let keys = {};
for(x in keysUsed) {
	keys[keysUsed[x]] = false;
}
let deathReplay = false;
let startTime;
let deathTime;

window.addEventListener("keydown", (e) => {
	keys[e.keyCode] = true;
	keys[VK_SHIFT] = e.shiftKey;
});
window.addEventListener("keyup", (e) => {
	keys[e.keyCode] = false;
	keys[VK_SHIFT] = e.shiftKey;
});

animations.execute();
let pastAct = [7];

let replayIndex = 0;

PIXI.loader.onComplete.add(() => {
	player = new Player();
	app.ticker.add(() => {
		if (!allowGameLoop) {
			return;
		}

		let xdir = 0;
		let ydir = 0;

		//replays
		if(!deathReplay) {
			let currAct = [keys[VK_X], keys[VK_Z], keys[VK_SHIFT], keys[VK_UP]||keys[VK_W],
						    keys[VK_DOWN]||keys[VK_S], keys[VK_LEFT]||keys[VK_A], keys[VK_RIGHT]||keys[VK_D]];

			for(n=0; n<currAct.length; n++) {
				if(pastAct[n] != currAct[n]) {
					replay.push({key:n, time:getTimeNow()-startTime, location:player.getLocation()});
					//replay.push(getTimeNow()-startTime);
					if(spectate==-1) {
						let stringify = JSON.stringify(replay.self);
						// console.log(stringify);
						$.post("/spectate", {
							replay: stringify
						});
	 				}
					pastAct[n] = currAct[n];
				}
			}
		} else {
			// if(new String(replayI).trim() != new String("\"false\"").trim() ) {

			// }
			if(spectate > 0) {
				$.get("/spectate/"+follow, {}, (result) => {
					console.log(JSON.parse(result.events));
					replay.self = JSON.parse(result.events);
					replay.length = 1000;
				});
			} else if(getTimeNow()-startTime > deathTime) {
				player.die();
			}
			while(replayIndex < replay.size() && replay.get(replayIndex) != null && replay.get(replayIndex).time < getTimeNow()-startTime-skipTime) {
				pastAct[replay.get(replayIndex).key] = !pastAct[replay.get(replayIndex).key];
				// Commented out: Accuracy check, with super button mash gets at most 6 pixels off?
				// if(replay.get(replayIndex).location.x  != player.getLocation().x || replay.get(replayIndex).location.y != player.getLocation().y) {
				// 	console.log(replayIndex+"-Location: "+replay.get(replayIndex).location.x+" , "+replay.get(replayIndex).location.y);
				// 	console.log(replayIndex+"-Guess Location: "+player.getLocation().x+" , "+player.getLocation().y);
				// }
				player.setLocation(replay.get(replayIndex).location);
				replayIndex++;
			}
			keys[VK_X] = pastAct[0];
			keys[VK_Z] = pastAct[1];
			keys[VK_SHIFT] = pastAct[2];
			keys[VK_UP] = pastAct[3];
			keys[VK_W] = pastAct[3];
			keys[VK_DOWN] = pastAct[4];
			keys[VK_S] = pastAct[4];
			keys[VK_LEFT] = pastAct[5];
			keys[VK_A] = pastAct[5];
			keys[VK_RIGHT] = pastAct[6];
			keys[VK_D] = pastAct[6];
		}
		// replays end
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
		if (keys[VK_SHIFT]) {
			xdir *= 0.60;
			ydir *= 0.60;
		}
		if (xdir < 0) {
			player.runAnimation("playerIdleLeft");
		} else if (xdir > 0) {
			player.runAnimation("playerIdleRight");
		} else {
			player.runAnimation("playerIdle");
		}
		player.move(xdir * MOVEMENT_SPEED, ydir * MOVEMENT_SPEED);

		if(player.shootCooldown == 0) {
			if (keys[VK_Z]) {
				player.shoot(keys[VK_SHIFT]);
			}
		}else {
			player.shootCooldown--;
		}

		let projectile, enemy;
		for (var k = 0, length = playerProjectiles.length; k < length; ++k) {
			projectile = playerProjectiles.get(k);
			if (projectile !== null && projectile != undefined) {
				for (var h = 0, length2 = enemies.length; h < length2; ++h) {
					enemy = enemies.get(h);
					if (enemy !== null && projectile != undefined) {
						if (projectile.handle.x >= enemy.handle.x - 10 && projectile.handle.x <= enemy.handle.x + 10 &&
								projectile.handle.y >= enemy.handle.y - 10 && projectile.handle.y <= enemy.handle.y + 10) {
							enemy.onCollide(projectile);
							break;
						}
					}
				}
			}
		}
		for (var k = 0, length = enemyProjectiles.length; k < length; ++k) {
			let projectile = enemyProjectiles.get(k);
			if (projectile !== null) {
				if (projectile.handle.x >= player.handle.x - PLAYER_HITBOX && projectile.handle.x <= player.handle.x + PLAYER_HITBOX &&
					projectile.handle.y >= player.handle.y - PLAYER_HITBOX && projectile.handle.y <= player.handle.y + PLAYER_HITBOX) {
					player.onCollide(projectile);
					break;
				}
			}
		}
		for (var k = 0, length = enemies.length; k < length; ++k) {
			let currentEnemy = enemies.get(k);
			if (currentEnemy !== null) {
				if (currentEnemy.handle.x >= player.handle.x - PLAYER_HITBOX && currentEnemy.handle.x <= player.handle.x + PLAYER_HITBOX &&
					currentEnemy.handle.y >= player.handle.y - PLAYER_HITBOX && currentEnemy.handle.y <= player.handle.y + PLAYER_HITBOX) {
					player.onCollide(currentEnemy);
					break;
				}
			}
		}
	});
	initializeStage();
	startTime = getTimeNow();
	master.dispatch();
});
