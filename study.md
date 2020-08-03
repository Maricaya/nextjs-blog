# 启动项目
## 启动数据库
mac/linux/windows 新版 docker
```bash
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```
windows toolbox
```bash
docker-machine run default
/ 假设 default是您的Linux VM /

docker-machine ssh default

docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

sudo sed -i "s|EXTRA_ARGS='|EXTRA_ARGS='--registry-mirror=https://xxxx.mirror.aliyuncs.com |g" /var/lib/boot2docker/profile
```
## 清空之前的开发环境
# mac & linux & windows 新版docker
```bash
docker ps
docker kill 容器id
docker rm 容器id

rm -rf blog-data 

# 或 windows toolbox
docker container prune 
docker volume rm blog-data
```
## 创建数据库
```bash
docker exec -it 容器id bash
psql -U blog -W
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```
## 数据库
首先ToolBox 需要修改 ormconfig.json 中的 host，
在控制台输入 docker-machine.exe ip, host 修改为这个值

由于我们使用了 TypeScript + typeorm，需要在 User.ts 中，删去 getDatabaseConnection 相关代码。
然后运行
```bash
yarn m:run
node dist/seed.js
```
不然会报错

## 开发
```bash 
yarn dev
```
## 部署
```bash
yarn build
yarn start
```
----------------------以下是项目创建过程----------------------
# 完成点击 posts 列表查看文章功能
- 加个 Link>a 标签 嘛

## [id].tsx
- 步骤
实现 PostsShow, 从 props 接收 post 数据
实现 getStaticProps, 从第一个参数接收 params.id
实现 getStaticPaths, 返回 id 列表

- 优化 md 文档样式
yarn add marked

# 启动 docker
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

docker ps
查找到容器id值

docker exec -it 容器id（前3位） bash

进入pg命令行
psql -U blog -W

执行pg命令
创建数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

# 如何运行 TypeScript
- Next.js 默认使用 babel 来将 TS 编译为 JS（内置功能）
- TypeORM 推荐使用 ts-node 来编译（没有内置）
- babel 和 ts-node 对 TS 的支持并非完全一致
- 所以我们必须进行统一，全部都用 babel

# 做法
yarn add @babel/cli  
打包
npx babel ./src --out-dir dist --extensions ".ts,.tsx"
yarn add --dev @babel/plugin-proposal-decorators

# 链接数据库
-   步骤
选做：升级 Node.js 到 v14
安装 @babel/cli
npx babel ./src --out-dir dist --extensions ".ts,.tsx"
根据错误提示搜索答案
yarn add --dev @babel/plugin-proposal-decorators
去 Next.js 官网查看 .babelrc 默认配置，复制
创建 .babelrc，添加插件
重新运行刚刚失败的命令
得到 dist 里面的 JS，运行 node dist/index.js
根据错误提示再加上数小时的搜索，修改 ormconfig
重新运行 node dist/index.js
成功看见 connection 对象即为成功

# 重要配置：禁用 sync
-   ormconfig
"synchronize": false
如果为 true，那么在连接数据库时，typeorm会自动根据entity目录来修改数据表
假设entity里面有User，就会自动创建User表

# 创建表（通过 migration）
 \c blog_development 连接 数据库

- posts表
npx typeorm migration:create -n CreatePost
得到 src/migrations/{TIMESTAMP}-CreatePost.ts

# 数据映射到实体
- 背景
刚刚只是在数据库里创建了 Post，代码如何读写 Post 呢
答案: 将数据映射到 Entity（实体）
命令：typeorm entity:create -n Post

- 知识点
@PrimaryGeneratedColumn('increment')
@Column('varchar')
@Column('text')

- 如何使用实体
EntityManager 或 Repository

# 总结
- migration 数据迁移
- entity 实体
- connection 连接
- manager / repo

# seed 数据填充

# 解决最难的问题
1. createConnection 第二遍会报错
2. getConnection 第一遍会报错
3. create x 1 + get x n 保存时会触发create 
4. typeorm getConnectionManager 处于 node_modules，保存时不会重新触发
5. 自己写mananger没用ctrl+s 触发 manager 还原

# 图解 session

# 如何在代码中隐藏 密码/秘钥

# 博客的增删改查

# 软件 Cypress 进行自动化测试
