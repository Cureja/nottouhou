
import copy
import json

data = {
    "frames": {},
    "meta": {
        "image": "./idles.png",
        "format": "RGBA8888",
    }
}

for k in range(0, 4):
    data["frames"]["idle{0}".format(k)] = {
        "frame": {
            "x": 13 + k * 32,
            "y": 0,
            "w": 32,
            "h": 48
        },
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {
            "x": 0,
            "y": 0,
            "w": 32,
            "h": 48
        },
        "sourceSize": {
            "w": 32,
            "h": 48
        }
    }

for k in range(0, 7):
    data["frames"]["idleLeft{0}".format(k)] = {
        "frame": {
            "x": 13 + k * 32,
            "y": 48,
            "w": 32,
            "h": 48
        },
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {
            "x": 0,
            "y": 0,
            "w": 32,
            "h": 48
        },
        "sourceSize": {
            "w": 32,
            "h": 48
        }
    }
    data["frames"]["idleRight{0}".format(k)] = {
        "frame": {
            "x": 13 + k * 32,
            "y": 48,
            "w": 32,
            "h": 48
        },
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {
            "x": 0,
            "y": 0,
            "w": 32,
            "h": 48
        },
        "sourceSize": {
            "w": 32,
            "h": 48
        }
    }

with open("./idles.json", "w+") as f:
    json.dump(data, f, indent=4)
