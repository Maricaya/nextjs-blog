#!/usr/bin/env bash
docker start 54f &&
cd /home/blog/app/nextjs-blog/ &&
git pull &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch &&
yarn compile &&
yarn m:run &&
git reset --hard HEAD &&
docker build -t sunnyla/node-web-app . &&
docker kill app &&
docker rm app &&
#：--network=host 会导致端口映射失效，端口直接就是阿里云机器的端口，但这种模式比较容易理解
docker run --name app --network=host  -p 3000:3000 -d sunnyla/node-web-app &&
echo "ok!"
