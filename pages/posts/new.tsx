import {NextPage} from 'next';
import * as React from 'react';
import {Form} from '../../components/Form';
import {useCallback} from 'react';
import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const PostsNew: NextPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const onChange = useCallback((key, value) => {
        setFormData({...formData, [key]: value})
    }, [formData]);
    const [errors, setErrors] = useState({
        username: [], password: [], passwordConfirmation: []
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post(`/api/v1/posts`, formData)
            .then(() => {
                window.alert('提交成功');
            }, (error) => {
                if (error.response) {
                    const response: AxiosResponse = error.response;
                    if (response.status === 422) {
                        setErrors(response.data);
                    }
                }
            });
    }, [formData]);
    return (
        <div>
            <Form fields={[
                {label: '标题', type: 'text', value: formData.title,
                    onChange: e => onChange('username', e.target.value), errors: errors.username},
                {label: '内容', type: 'text', value: formData.title,
                    onChange: e => onChange('username', e.target.value), errors: errors.username}
            ]} onSubmit={onSubmit} buttons={
                <button type="submit">提交</button>
            }/>
        </div>)
};

export default PostsNew;
