#!/usr/bin/env bash
docker start 54f &&
cd /home/blog/app/nextjs-blog/ &&
git pull &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch;
yarn compile &&
yarn m:run &&
git reset --hard HEAD &&
docker build -t sunnyla/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app -p 3000:3000 -d sunnyla/node-web-app &&
echo "ok!"
