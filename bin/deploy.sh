#!/usr/bin/env bash
docker start 54f &&
cd /home/blog/app/nextjs-blog/ &&
git pull &&
yarn install --production=false &&
yarn build &&
docker build -t sunnyla/node-web-app . &&
docker run --name app -p 3000:3000 -d sunnyla/node-web-app &&
echo "ok!"
