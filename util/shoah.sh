#!/bin/bash
cd .. && rake db:drop db:create db:reset db:migrate
