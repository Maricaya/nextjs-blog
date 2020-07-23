import {GetServerSideProps, NextPage} from 'next';
import * as React from 'react';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {useForm} from 'hooks/useForm';
import axios from 'axios';

type Props = {
  id: number;
  post: Post;
}

const PostsEdit: NextPage<Props> = (props) => {
  const {post, id} = props;
  console.log('post');
  console.log(post);
  const {form} = useForm({
    initFormData: {title: post.title, content: post.content},
    fields: [
      {label: '大标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'},
    ],
    buttons: <div className="actions">
      <button type="submit">提交</button>
    </div>,
    submit: {
      request: formData => axios.patch(`/api/v1/posts/${id}`, {...formData, id}),
      success: () => {
        window.alert('提交成功');
      }
    }
  });
  return (
    <div className="postsNew">
      <div className="form-wrapper">
        {form}
      </div>
      <style jsx global>{`
      .form-wrapper{
        padding: 16px;
      }
      .postsNew .field-content textarea{
        height: 20em;
        resize: none;
      }
      .postsNew .label-text{
        width: 4em;
        text-align:right;
      }
      .postsNew .actions{
        text-align:center;
        background: #ddd;
        padding: 4px 0;
      }
      `}</style>
    </div>
  );
};

export default PostsEdit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {id} = context.params;

  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne('Post', context.params.id);

  return {
    props: {
      id: parseInt(id.toString()),
      post: JSON.parse(JSON.stringify(post))
      // currentUser
    }
  };
};
