import {NextPage} from 'next';
import * as React from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <img src="/logo.png" alt=""/>
        <h1>Marica 的个人博客</h1>
        <p>我是一个热爱编程的人</p>
        <p>
          <Link href="/posts">
            <a>文章列表</a>
          </Link>
        </p>
      </div>
      <style jsx>{`
        .cover {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-item: center;
          flex-direction: column;
          text-align: center;
        }
        .cover > img{
          margin: 0 auto;
          width: 120px;
          height: 120px;
        }
      `}</style>
    </>
  );
};

export default Home;
