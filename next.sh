#! /bin/bash

NEXT=$(ls ./${npm_config_year}/*.js | wc -l | xargs)
NEXT=$(printf \"%02d\" $((1 + NEXT)))
NEXT=./$1/day$(echo $NEXT | sed 's/[^0-9]//g')

touch $NEXT.input
cat ./day.template > $NEXT.js
