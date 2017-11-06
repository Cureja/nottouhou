#!/usr/bin/python

import json
import os
import sys

'''
Usage:
./generate.py sourceimage animationname framewidth frameheight startframex startframey nframes
'''

def create_frame(x, y, w, h):
    return {
        "trimmed": False,
        "frame": {
            "x": x,
            "y": y,
            "w": w,
            "h": h
        },
        "rotated": False,
        "sourceSize": {
            "w": w,
            "h": h
        },
        "spriteSourceSize": {
            "x": 0,
            "y": 0,
            "w": w,
            "h": h
        }
    }

if __name__ == "__main__":
    if len(sys.argv) != 8:
        print "bad arguments"
        exit()
    src = sys.argv[1]
    anim_name = sys.argv[2]
    frame_width = int(sys.argv[3])
    frame_height = int(sys.argv[4])
    startx = int(sys.argv[5])
    starty = int(sys.argv[6])
    nframes = int(sys.argv[7])

    data = {
        "frames": {},
        "meta": {
            "image": "src/" + os.path.basename(src),
            "format": "RGBA8888"
        }
    }
    for k in range(0, nframes):
        name = "{0}{1}".format(anim_name, k)
        data["frames"][name] = create_frame((startx + k) * frame_width, starty * frame_height, frame_width, frame_height)

    with open("frames/{0}.json".format(anim_name), "w+") as f:
        json.dump(data, f) # add indent=4 for readable json
