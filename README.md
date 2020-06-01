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
        console.log('fullPath');
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



