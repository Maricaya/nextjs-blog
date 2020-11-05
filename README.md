# 项目创建过程
- [Next.js + TypeScript 入门之项目搭建、三种渲染方式（BSR、SSG、SSR）](https://juejin.im/post/6855917901090652174)
- [TS + TypeORM 踩坑实践 (一) hello ORM](https://juejin.im/post/6857391336929263624)
- [TS + TypeORM 踩坑实践 (二) 操作数据表](https://juejin.im/post/6858509402798817294)
- [从 0 开始部署你的 Node 应用(Ubantu、docker、nginx)](https://juejin.im/post/6864785804066029575)

# 代码使用

请下载本代码，然后用 WebStorm 或者 VSCode 打开。

## 启动数据库

如果你没有创建过数据库，请运行
```bash
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

或者旧版 Windows Docker 客户端运行下面的代码

docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

如果你创建过数据库，请运行

```bash
docker ps -a
docker restart 容器id
```

## 创建数据库

```
docker exec -it <id> bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据表

首先修改 ormconfig.json 中的 host，然后运行

```
yarn m:run
```

## 开发

```bash
yarn dev
# or
npm run dev
```

## 部署

```bash 
# 执行本地脚本
git push
ssh blog@dev1 'bash -s' < bin/deploy.sh
# 执行服务器上脚本
ssh blog@dev1 'sh /home/blog/app/nextjs-blog/bin/deploy.sh'
```

## NGINX 配置 
```bash
docker run --name nginx1 --network=host -v /home/blog/nginx.conf:/etc/nginx/conf.d/default.conf -v /home/blog/app/nextjs-blog/.next/static/:/usr/share/nginx/html/_next/static/ -d nginx:1.19.1
```
