
//for console debugging
let app;
let player;

$(document).ready(() => {
	app = new PIXI.Application();
	$("#game-container").append(app.view); //adds game to webpage
	app.renderer.backgroundColor = 0x222222;
	app.renderer.resize(600, 600);

	const MOVEMENT_SPEED = 4;

	player = {
		handle: null,
		anim: "idle",
		anims: {},
		loops: {},
		animate: function(anim) {
			if (this.handle != null && this.anim != anim) {
				this.anim = anim;
				this.handle.textures = this.anims[anim];
				this.handle.loop = this.loops[anim];
				this.handle.gotoAndPlay(0);
			}
		},
		pushAnim: function(anim, frames, loop) {
			this.anims[anim] = frames;
			this.loops[anim] = loop;
		},
		move: function(x, y) {
			if(this.handle != null){
				let minx = this.handle.width / 2;
				let maxx = app.renderer.width - minx;
				let miny = this.handle.height / 2;
				let maxy = app.renderer.height - miny;

				this.handle.x += x; //movement
				this.handle.y += y;

				if (this.handle.x < minx) { //if out of bounds move back to edge
					this.handle.x = minx;
				}
				else if (this.handle.x > maxx) {
					this.handle.x = maxx;
				}
				if (this.handle.y < miny) {
					this.handle.y = miny;
				}
				else if (this.handle.y > maxy) {
					this.handle.y = maxy;
				}
			}
		}
	};

	let projectiles = [];
	let projectile = {};
	let texture = PIXI.Texture.fromImage('../images/projectile.png');
	projectile.handle = new PIXI.Sprite(texture);
	projectile.onUpdate = function() {
	    this.handle.x += 1;
	    this.handle.y += 1;
			if (this.handle.x < minx || this.handle.x > maxx || this.handle.y < miny || this.handle.y > maxy) {
				this.handle = null;
			}
			//dereferencing will most likely remove it
			//array of projectiles, give it its own index so it can be easily referenced and deleted
	};

	function shoot(startPosition){
		let texture = PIXI.Texture.fromImage('../images/projectile.png');
		var projectile1 = new PIXI.Sprite(texture);
		var projectile2 = new PIXI.Sprite(texture);
		var projectile3 = new PIXI.Sprite(texture);

		projectile1.position.x = startPosition.x;
		projectile1.position.y = startPosition.y;
		projectile2.position.x = startPosition.x;
		projectile2.position.y = startPosition.y;
		projectile3.position.x = startPosition.x;
		projectile3.position.y = startPosition.y;

		/*projectile1.rotation = 0.75;
		projectile2.rotation = 0.75;
		projectile3.rotation = 0.75;*/

		app.stage.addChild(projectile1);
		app.stage.addChild(projectile2);
		app.stage.addChild(projectile3);

		projectiles.push(projectile1);
		projectiles.push(projectile2);
		projectiles.push(projectile3);
	}

	PIXI.loader.add("../images/idles.json", {crossOrigin: ''})
						 .add('../images/projectile.png').load(() => {
		let frames = [];
		for (let k = 0; k < 4; k++) {
			frames.push(PIXI.Texture.fromFrame("idle" + k));
		}
		player.pushAnim("idle", frames, true);

		frames = [];
		for (let k = 0; k < 7; k++) {
			frames.push(PIXI.Texture.fromFrame("idleLeft" + k));
		}
		player.pushAnim("idleLeft", frames, false);

		frames = [];
		for (let k = 0; k < 7; k++) {
			frames.push(PIXI.Texture.fromFrame("idleRight" + k));
			frames[k].rotate = 12; //12 is the magic number for mirroring. http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=texture-rotate.js&title=Texture%20Rotate
		}
		player.pushAnim("idleRight", frames, false);

		player.handle = new PIXI.extras.AnimatedSprite(player.anims.idle);
		player.handle.x = app.renderer.width / 2;
		player.handle.y = app.renderer.height / 2;
		player.handle.anchor.set(0.5); //0 is top left, 0.5 is middle, 1 is bottom right
		player.handle.animationSpeed = 0.5;
		player.handle.play();


		app.stage.addChild(player.handle);
	});

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
	});
	window.addEventListener("keyup", (e) => {
		keys[e.keyCode] = false;
	});

	//FIXME xdir/ydir assume topleft is 0,0. is this the case?

	app.ticker.add(() => {
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
		if (keys[VK_Z]) {
			shoot({x: player.handle.x, y: player.handle.y});
		}
		if (xdir < 0) {
			player.animate("idleLeft");
		}
		else if (xdir > 0) {
			player.animate("idleRight");
		}
		else {
			player.animate("idle");
		}
		player.move(xdir * MOVEMENT_SPEED, ydir * MOVEMENT_SPEED);

		for(var i = projectiles.length - 1; i >= 0; i--){
			projectiles[i].position.x -= Math.cos(projectiles[i].rotation + 20) * MOVEMENT_SPEED;
			projectiles[i].position.y -= Math.sin(projectiles[i].rotation + 20) * MOVEMENT_SPEED;
		}
	});
});
