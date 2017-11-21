#!/bin/bash
# for when something else is using port 5000
lsof -wni tcp:5000
