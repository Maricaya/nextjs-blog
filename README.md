# 起步

```bash
npm init next-app 项目名称
yarn add --dev @types/react @types/react-dom
# 安装这个是为了让 WebStorm 自动提示

```

## 新增页面 
建立目录 pages/posts/first-post.js

查看 http://localhost:3000/posts/first-post

# 导航
/ 到 /posts/first-post 
页面直接跳转,没有发出任何请求.

传统导航
浏览器访问page1,page2

next 快速导航(客户端导航)
页面不会刷新,用 AJAX 请求新页面内容
不会请求重复的 HTML,CSS,JS
自动在页面插入新内容,删除旧内容
因为省了一些请求和解析过程,所以速度极快

# css
使用 scss
yarn add sass

# 静态资源
next 推荐放在 public/ 里，但是我并不推荐这种做法，因为不支持哈希。
public 中的静态资源没有加缓存，这样每次请求资源都会去请求服务器，造成资源浪费。
但是如果加了缓存，我们每次更新静态资源就必须更新资源名称，否则浏览器还是会加载旧资源。

需要在 next.js 中配置 webpack
建立文件 next.config.js 配置 file-loader
安装 yarn add --dev file-loader

```js
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // img 路径名称.hash.ext
            // 比如 1.png 路径名称为
            // _next/static/1.29fef1d3301a37127e326ea4c1543df5.png
            name: '[name].[contenthash].[ext]',
            // 硬盘路径
            outputPath: 'static',
            // 网站路径是
            publicPath: '_next/static'
          }
        }
      ]
    })
    return config
  }
}
```

如果不想自己配置，也可以使用 next-images

```bash
yarn add next-images
```

```js
const withImages = require('next-images')

module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

```

# 启用 typescript
## 创建 tsconfig.json
+ tsc --init 运行后得到 tsconfig.json
+ 将 jsconfig.json 里面的配置合并到 tsconfig.json
- 删除 jsconfig.json

## 重启 yarn dev
- yarn add --dev typescript @types/react @types/node @types/react-dom
- yarn dev

## 改后缀
- 将文件名由 .js 改为 .tsx
- 不需要一次将所有文件全部改完

# tsconfig 加强
在 tsconfig.json 里添加
"noImplicitAny": true
禁用隐式的 any    

# Next.js API
## 目前的页面
- index 和 posts/first-post 都是 HTML
- 但实际开发中我们需要请求 /user /shops 等 API
- 返回的内容是 JSON 格式的字符串

## 使用 Next.js API
- 路径为 /api/v1/posts 以便与 /posts 区分开来
- 默认导出的函数的类型为 NextApiHandler
- 该代码只运行在 Node.js 里,不运行在浏览器里

```bash
yarn add gray-matter
# 如果没有，肯定是自带的
yarn add --dev @types/gray-matter
```

posts 接口 
```tsx
import path from "path";
import fs, {promises as fsPromise} from "fs";
import matter from "gray-matter";

export const getPosts = async () => {
    const markdownDir = path.join(process.cwd(), 'markdown');

    const fileNames = await fsPromise.readdir(markdownDir);

    const x = fileNames.map(fileName => {
        const fullPath = path.join(markdownDir, fileName);
        const id = fileName.replace(fullPath, '');
        const text = fs.readFileSync(fullPath, 'utf8');
        const {data: {title, date}, content} = matter(text);
        return {
          id, title, date
        }
    });
    console.log('x');
    console.log(x);
    return x;
};
```

# Next.js 三种渲染
##  客户端渲染
-   只在浏览器上执行的渲染

##  静态页面生成（SSG）
-   Static Site Generation，解决白屏问题、SEO 问题
-   无法生成用户相关内容(所有用户请求都一样)

##  服务端渲染（SSR)
-   解决白屏问题、SEO 问题
-   可以生成用户相关内容（不同用户结果不同）

-   注意 SSR 和 SSG 都属于预渲染 Pre-rendering

### 旧瓶装新酒
#### 三种渲染方式分别对应
-   客户端渲染 -- 用 JS 创建 HTML
-   SSG -- 页面静态化，把 PHP 提前渲染成 HTML
-   SSR -- PHP、Python、Ruby、Java 后台的基本功能
#### 不同点
-   Next.js 的预渲染可以与前端 React 无缝对接

# 第一种方式 客户端渲染
## 缺点
-   白屏
在 AJAX 得到相应之前，页面中之后 Loading
-   SEO 不友好
搜索引擎访问页面，看不懂 posts 数据
因为搜索引擎默认不会执行 JS，只能看到 HTML

react 代码
```tsx
// 访问 http://localhost:3000/posts
// 客户端渲染，数据本来不在页面上，通过 ajax 请求后渲染到页面上
// 这种方式白屏时间很长
import {NextPage} from 'next';
import axios from 'axios';
import {useEffect, useState} from "react";
import * as React from "react";

type Post = {
    id: string,
    id: string,
    title: string
}
const PostsIndex: NextPage = () => {
    // [] 表示只在第一次渲染的时候请求
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/v1/posts').then(response => {
            setTimeout(() => {
                setPosts(response.data);
                if (response.data.length === 0) {
                    setIsEmpty(true);
                }
                setIsLoading(false);
            }, 3000);
        }, () => {
            setIsLoading(true);
        })
    }, []);
    return (
        <div>
            <h1>文章列表</h1>
            {isLoading ? <div>加载中</div> :
                isEmpty ? <div>没有文章</div>
                    : posts.map(p => <div key={p.id}>
                {p.id}
            </div>)}
        </div>
    )
};

export default PostsIndex;
```

上面的内容，服务端渲染了一次，客户端又渲染了一次。

-   参考 React SSR 的官方文档
推荐在后端 renderToString() 在前端 hydrate()
hydrate() 混合，会保留 HTML 并附上事件监听
也就是说后端会渲染 HTML, 前端添加监听
前端也会渲染一次，以确保前后端渲染结果一致。

比如：加上 debugger，修改 HTML 内容，控制台会报错。
因为前后端渲染结果不一致

-   推论
所有页面至少有一个标签是静态内容，由服务端渲染

# 第二种渲染方式 静态页面生成（SSG）
博客网站，其实每个人看到的文章列表都是一样的。
那为什么还需要在每个人的浏览器上渲染一次？
为什么不在后端渲染好，然后分发给每个人。
N 次渲染变成了 1 次渲染
N 次客户端渲染变成了 1 次静态页面生成
这个过程叫做 **动态内容静态化**

-   显然，后端最好不要通过 AJAX 来获取 posts
-   那么，应该如何获取 posts 呢？

## getStaticProps 获取 posts
-   声明位置
每个 page 不是默认导出一个函数吗？
把 getStaticProps 声明在这个函数旁边即可

ps: .d.ts 文件中放置公共代码

代码写法：
```tsx
export const getStaticProps: GetStaticProps = async () => {
    const posts = await getPosts();
    return {
        props: {posts: posts}
    }
}
```
同构！

![avatar](/assets/images/2.jpeg)

-   现在前端不用 AJAX 也能拿到 posts 了
-   这就是同构 SSR 的好处：后端数据可以直接传给前端
-   前端 JSON.parse 一下子就能得到 posts
(以上内容 next.js 已经帮我们做好了)

难道 PHP/Java/Python 就不能吗
- 也可以，思路一样
- 但是不支持 JSX，不能与 React 无缝衔接
- 而且他们的对象不能直接提供给 JS用，需要类型转换

# 静态化的时机
环境
- 在**开发环境**，每次请求都会运行一次 getStaticProps 
- 这是为了方便你修改代码重新运行
- 在**生产环境**，getStaticProps 只在 build 时运行
- 这样可以提供一份 HTML 给所有用户下载

如何体验生产环境
- 关掉 yarn dev
- yarn build
- yarn start

打包之后
λ  (Server)  SSR 不能自动创建 HTML（等会再说）
○  (Static)  自动创建 HTML (发现你没用到 props)
●  (SSG)     自动创建 HTML + JSON (等你用到 props)

三种文件类型
posts.html = posts.js + posts.json

posts.html 含有静态内容，用于用户直接访问
post.js 也含有静态内容，用于快速导航（与 HTML 对应）
posts.json 含有数据，跟 posts.js 结合得到页面
- 为什么不直接把数据放入 posts.js 呢？
- 显然，是为了让 posts.js 接受不同的数据**
- 当然，目前只能接受一个数据（来自 getStaticProps）

# SSG 小结
背景：如果动态内容与用户无关，那么可以提前静态化
通过 getStaticProps 可以获取数据
静态内容 + 数据（本地获取）就得到了完整页面
代替了之前的 静态内容+动态数据（AJAX获取）

时机
静态化是在 yarn build 的时候实现的

优点
生产环境直接给出完整页面
首屏不会白屏
搜索引擎能看到页面内容（方便 SEO）

# 如果页面跟用户相关呢？
• 较难提前静态化
    • 需要在用户请求时，获取用户信息，然后通过用户信息去数据库拿数据
    • 如果硬要做，就要给每个用户创建一个页面
    • 有时候这些数据更新极快，无法提前静态化
    •  比如微博首页的信息流
• 那怎么办？
    • 要么客户端渲染，下拉更新
    • 要么服务的渲染，下拉 AJAX 更新(没有白屏
• 但这次的服务端渲染不能用 getStaticProps
• 因为 getStaticProps 是在 build 时执行的
• 可用 getServerSideProps(context: NextPageContext)

  比如：根据用户不同浏览器展示不同的页面。
  
# getServerSideProps
运行时机
-   无论是开发环境还是生产环境
-   都是在**请求到来之后运行** getServerSideProps

回顾一下 getStaticProps
-   开发环境，每次请求到来后运行，方便开发
-   生产环境，**build 时运行**

参数
-   context，类型为 NextPageContext
-   context.req/context.res 可以获取请求和响应
-   一般只需要用到 context.req

# 总结
- 静态内容
直接输出 HTML，没有术语
- 动态内容
术语：客户端渲染，通过 AJAX 请求，渲染成 HTML
- 动态内容静态化
术语：SSG，通过 getStaticProps 获取用户无关内容
- 用户相关动态内容静态化
术语：SSR，通过 getServerSideProps 获取请求
缺点：无法获取客户端信息，如浏览器窗口大小

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
