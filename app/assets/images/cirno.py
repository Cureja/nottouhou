
import copy
import json

data = {
    "frames": {},
    "meta": {
        "image": "./cirno.png",
        "format": "RGBA8888",
    }
}

for k in range(0, 4):
    data["frames"]["idle{0}".format(k)] = {
        "frame": {
            "x": 89 + k * 47,
            "y": 0,
            "w": 47,
            "h": 62
        },
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {
            "x": 0,
            "y": 0,
            "w": 47,
            "h": 62
        },
        "sourceSize": {
            "w": 47,
            "h": 62
        }
    }

for k in range(0, 1):
    data["frames"]["right{0}".format(k)] = {
        "frame": {
            "x": 45 + k * 45,
            "y": 0,
            "w": 45,
            "h": 62
        },
        "rotated": False,
        "trimmed": False,
        "spriteSourceSize": {
            "x": 0,
            "y": 0,
            "w": 45,
            "h": 62
        },
        "sourceSize": {
            "w": 45,
            "h": 62
        }
    }

with open("./cirno.json", "w+") as f:
    json.dump(data, f, indent=4)
