import * as React from 'react';
import Link from 'next/link';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {Post} from 'src/entity/Post';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {UAParser} from 'ua-parser-js';
import qs from 'querystring';
import {usePager} from '../../hooks/usePager';
import {withSession} from '../../lib/withSession';

type Props = {
  posts: Post[],
  count: number,
  perPage: number,
  page: number,
  totalPage: number,
  currentUser: User | null
}

const PostsIndex: NextPage<Props> = (props) => {
  const {posts, page, totalPage, currentUser} = props;
  const {pager} = usePager({
    page, totalPage
  });
  return (
    <>
      <div className="posts">
        <header>
          <h1>文章列表</h1>
          {
            currentUser &&
            <Link href="/posts/new"><a>新增文章</a></Link>
          }
        </header>
        {posts.map(post =>
          <div className="onePost" key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </div>
        )}
        <footer>
          {pager}
        </footer>
      </div>
      <style jsx>{`
        .posts {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
        }
        .posts > header {
          display: flex;
          align-item: center;
        }
        .posts > header > h1{
          margin: 0;
          margin-right: auto;
        }
        .onePost {
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
        }
        .onePost > a {
          border-bottom: none;
          color: #000;
        }
        .onePost > a:hover {
          color: #00adb5;
        }
      `}</style>
    </>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(
async (context: GetServerSidePropsContext) => {
    const index = context.req.url.indexOf('?');
    const search = context.req.url.substr(index + 1);
    const query = qs.parse(search);

    const page = parseInt(query.page && query.page.toString()) || 1;

    const currentUser = (context.req as any).session.get('currentUser') || null;

    console.log('环境变量', process.env.SECRET);

    const connection = await getDatabaseConnection();
    const perPage = 10;
    const [posts, count] = await connection.manager.findAndCount(Post, {
      skip: (page - 1) * perPage, take: perPage
    });
    const ua = context.req.headers['user-agent'];

    const result = new UAParser(ua).getResult();
    return {
      props: {
        browser: result.browser,
        posts: JSON.parse(JSON.stringify(posts)),
        count,
        perPage, page,
        currentUser,
        totalPage: Math.ceil(count / perPage)
      }
    };
  });
