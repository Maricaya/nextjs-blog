import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import * as React from "react";
import axios, {AxiosResponse} from 'axios'
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../hooks/useForm';

const SignIn: NextPage<{ user: User }> = (props) => {
    const initFormData = {
        username: '',
        password: ''
    };

    const onSubmit = (formData: typeof initFormData) => {
        setErrors({
            username: [], password: []
        });
        axios.post(`/api/v1/sessions`, formData)
            .then(() => {
                window.alert('登录成功');
                window.location.href = '/sign_in';
            }, (error) => {
                if (error.response) {
                    const response: AxiosResponse = error.response;
                    if (response.status === 422) {
                        setErrors(response.data);
                    }
                }
            });
    };
    const {form, setErrors} = useForm({
        initFormData,
        fields: [
            {label: '用户名', type: 'text', key: 'username'},
            {label: '密码', type: 'text', key: 'password'}
        ],
        buttons: <button type="submit">登录</button>,
        onSubmit
    });
    return (
        <>
            {props.user && <div>当前登录用户为 {props.user.username}</div>}
            <h1>登录</h1>
            {form}
        </>
    );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser') || '';
    console.log('user', user);
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    };
});
