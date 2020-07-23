import {NextPage} from 'next';
import * as React from 'react';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';

const PostsNew: NextPage = () => {
  // 类型是静态分析，不受代码顺序影响
  const {form} = useForm({
    initFormData: {title: '', content: ''},
    fields: [
      {label: '标题', type: 'text', key: 'title'},
      {label: '内容', type: 'textarea', key: 'content'}
    ],
    buttons: <div className="actions">
      <button type="submit">提交</button>
      </div>,
    submit: {
      request: formData => axios.post(`/api/v1/posts`, formData),
      success: () => {
        window.alert('提交成功');
        window.location.href = '/posts';
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
export default PostsNew;
