
let app;
let player;
let projectiles = [];
let cd = 5;

$(document).ready(() => {
	app = new PIXI.Application();
	$("#game-container").append(app.view);
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

				this.handle.x += x;
				this.handle.y += y;

				if (this.handle.x < minx) {
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

	/*let projectile = {};
	let pTexture = PIXI.Texture.fromImage('./projectile.png');
	projectile.handle = new PIXI.Sprite(pTexture);
	projectile.onUpdate = function() {
			if (this.handle.x < minx || this.handle.x > maxx || this.handle.y < miny || this.handle.y > maxy) {
				this.handle = null;
			}
			//dereferencing will most likely remove it
			//array of projectiles, give it its own index so it can be easily referenced and deleted
	};

	let focus = {};
	let fTexture = PIXI.Texture.fromImage('./focus.png')
	focus.handle = new PIXI.Sprite(fTexture)*/
	function focus(startPosition){
		cd = 20;
		let texture = PIXI.Texture.fromImage('./focus.png');
		var focus = new PIXI.Sprite(texture);
		focus.position.x = startPosition.x;
		focus.position.y = startPosition.y;
		focus.rotation = 0;

		app.stage.addChild(focus);
		projectiles.push({
			"projectile": focus,
			"update": function(self){
				self.position.y -= 2;
			}
		});
	}

	function shoot(startPosition){
		cd = 10;
		let texture = PIXI.Texture.fromImage('./projectile.png');
		var projectile1 = new PIXI.Sprite(texture);
		var projectile2 = new PIXI.Sprite(texture);
		var projectile3 = new PIXI.Sprite(texture);

		projectile1.position.x = startPosition.x - 10;
		projectile1.position.y = startPosition.y;
		projectile2.position.x = startPosition.x;
		projectile2.position.y = startPosition.y;
		projectile3.position.x = startPosition.x + 10;
		projectile3.position.y = startPosition.y;

		projectile1.rotation = 12.35;
		projectile2.rotation = 0;
		projectile3.rotation = .35;

		app.stage.addChild(projectile1);
		app.stage.addChild(projectile2);
		app.stage.addChild(projectile3);

		projectiles.push({
			"projectile": projectile1,
			"update": function(self) {
				self.position.x -= 1;
				self.position.y -= 3;//up and left
			}
		});
		projectiles.push({
			"projectile": projectile2,
			"update": function(self) {
				self.position.y -= 3;//up
			}
		});
		projectiles.push({
			"projectile": projectile3,
			"update": function(self) {
				self.position.x += 1;
				self.position.y -= 3;//up and right
			}
		});
	}

	PIXI.loader.add("./idles.json", {crossOrigin: ''})
						 .add('./projectile.png').load(() => {
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
		player.handle.anchor.set(0.5);
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
		if(cd <= 0){
			if (keys[VK_Z] && !keys[VK_SHIFT]) {
				shoot({x: player.handle.x, y: player.handle.y});
			}
			else if (keys[VK_Z] && keys[VK_SHIFT]){
				focus({x: player.handle.x, y:player.handle.y});
			}
		}
		else{
		  cd--;
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
			//projectiles[i].position.x -= Math.cos(projectiles[i].rotation + 20) * MOVEMENT_SPEED;
			//projectiles[i].position.y -= Math.sin(projectiles[i].rotation + 20) * MOVEMENT_SPEED;
			//if (projectiles[i].position.y < 0) {
			//	//destroy
			//}
			projectiles[i].update(projectiles[i].projectile);
			/*if(projectiles[i].projectile.position.y < 0){
				delete projectiles[i].projectile;
				projectiles.splice(i, 1);
			}*/
		}
	});
});
