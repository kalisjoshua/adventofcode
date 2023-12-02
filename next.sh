#! /bin/bash

YEAR="${1:-$(date +%Y)}"

NEXT=$(ls ./$YEAR/*.js | wc -l | xargs)
NEXT=$(printf \"%02d\" $((1 + NEXT)))
NEXT=./$YEAR/day$(echo $NEXT | sed 's/[^0-9]//g')

touch $NEXT.input
cat ./day.template > $NEXT.js
