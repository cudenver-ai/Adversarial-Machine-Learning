#!/bin/bash

cd "$(dirname "$0")"

cd front-end/
npm run build

cd ..

rm -rf back-end/assets/
cp -r front-end/dist/assets/ back-end/

mv back-end/assets/*.js back-end/static/
mv back-end/assets/*.css back-end/static/

rm -rf back-end/templates/*
cp front-end/dist/index.html back-end/templates/
cp front-end/dist/*.svg back-end/templates/

sed -i 's/\/assets\//\/static\//g' back-end/templates/index.html
