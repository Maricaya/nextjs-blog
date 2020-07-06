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
        buttons: <button type="submit">提交</button>,
        submit: {
            request: formData => axios.post(`/api/v1/posts`, formData),
            success: () => {
                window.alert('提交成功');
                window.location.href = '/posts';
            }
        }
    });
    return (
        <div>
            {form}
        </div>
    );
};
export default PostsNew;
