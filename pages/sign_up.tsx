import {NextPage} from "next";
import * as React from "react";
import axios from 'axios';
import {useForm} from '../hooks/useForm';

const signUp: NextPage = () => {
    const {form} = useForm({
        initFormData: { username: '',
            password: '',
            passwordConfirmation: ''},
        fields: [
            {label: '用户名', type: 'text', key: 'username'},
            {label: '密码', type: 'text', key: 'password'},
            {label: '确认密码', type: 'text', key: 'passwordConfirmation'}
        ],
        buttons: <button type="submit">注册</button>,
        submit: {
            request: formData =>
                axios.post(`/api/v1/users`, formData),
            message: '注册成功'
        }
    });
    // window.location.href = '/sign_in';
    return (
        <>
            <h1>注册</h1>
            {form}
        </>
    )
};

export default signUp;
