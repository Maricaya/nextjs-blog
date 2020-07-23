import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import {Post} from "../../src/entity/Post";
import marked from 'marked';

type Props = {
  post: Post
}

const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <>
      <div className="wrapper">
        <h1>{post.title}</h1>
        <header>
          {/*{currentUser &&*/}
          <p className="actions">
            {/*<Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>*/}
            {/*<button onClick={onRemove}>删除</button>*/}
          </p>
          {/*}*/}
        </header>
        <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
        </article>
      </div>
      <style jsx>{`
      .actions > *{
        margin: 4px;
      }
      .actions > *:first-child{
        margin-left: 0;
      }
      .wrapper{
        max-width: 800px;
        margin: 16px auto;
        padding: 0 16px;
      }
      h1{padding-bottom: 16px; border-bottom: 1px solid #666;}
      `}</style>
    </>
  )
};
export default postsShow;

export const getServerSideProps: GetServerSideProps<any, {id: string}> = async (context) => {
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post,  context.params.id);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  }
};
