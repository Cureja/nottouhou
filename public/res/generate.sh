#!/bin/bash

# arguments: srcfile prefix w h x y nframes
rotations() {
	for ((k = 0 ; k < 360 ; k += 45)); do
		./generate.py $1 $2$k $3 $4 $5 $6 $7;
	done
}

./generate.py res/frames/src/idles.png playerIdle 32 48 0 0 4
./generate.py res/frames/src/idles.png playerIdleLeft 32 48 0 1 7
./generate.py res/frames/src/idles.png playerIdleRight 32 48 0 1 7

rotations res/frames/src/projectile.png projectileKnifeIdle 9 24 0 0 1
./generate.py res/frames/src/focus.png projectileFocusIdle 18 43 0 0 1
