import {GetServerSideProps, NextPage} from 'next';
import * as React from "react";
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from 'axios'
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
const SignIn: NextPage<{user: User}> = (props) => {
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
                window.alert('登录成功')
                window.location.href = '/sign_in';
            }, (error) => {
                if (error.response) {
                    const response:AxiosResponse = error.response;
                    if (response.status === 422) {
                        setErrors(response.data);
                    }
                }
            })
    }, [formData]);
    return (
        <div>
            {props.user && <div>当前登录用户为 {props.user.username}</div>}
            <h1>登录</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label>用户名
                        <input type="text" value={formData.username}
                        onChange={e => setFormData({
                            ...formData,
                            username: e.target.value
                        })}/>
                    </label>
                    {errors.username?.length > 0 && <div>
                        {errors.username.join(',')}
                    </div>}
                </div>

                <div>
                    <label>密码
                        <input type="password" value={formData.password}
                        onChange={e => setFormData({
                            ...formData,
                            password: e.target.value
                        })}/>
                    </label>
                    {errors.password?.length > 0 && <div>
                        {errors.password.join(',')}
                    </div>}
                </div>

                <div>
                    <button type="submit">登录</button>
                </div>
            </form>
        </div>
    )
};

export default SignIn;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    }
});
