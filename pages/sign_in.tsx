import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import * as React from "react";
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from 'axios'
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {Form} from '../components/Form';

const SignIn: NextPage<{ user: User }> = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    });
    const [errors, setErrors] = useState({
        username: [], password: [], passwordConfirmation: []
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setErrors({
            username: [], password: [], passwordConfirmation: []
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
    }, [formData]);
    const onChange = useCallback((key, value) => {
        setFormData({...formData, [key]: value})
    }, [formData]);
    return (
        <>
            {props.user && <div>当前登录用户为 {props.user.username}</div>}
            <h1>登录</h1>
            <Form fields={[
                {label: '用户名', type: 'text', value: formData.username,
                    onChange: e => onChange('username', e.target.value), errors: errors.username},
                {label: '密码', type: 'password', value: formData.password,
                    onChange: e => onChange('password', e.target.value), errors: errors.password},
                {label: '确认密码', type: 'password', value: formData.passwordConfirmation,
                    onChange: e => onChange('passwordConfirmation', e.target.value), errors: errors.passwordConfirmation}
            ]} onSubmit={onSubmit} buttons={
                <button type="submit">登录</button>
            }
            />
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
