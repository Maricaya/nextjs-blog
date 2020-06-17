import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import * as React from "react";
import {useEffect, useState} from "react";
import {getConnection} from "typeorm";
import {getDatabaseConnection} from "../lib/getDatabaseConnection";

type Props = {
    browser: {
        name: string
    }
}

const index: NextPage<Props> = (props) => {
    const {browser} = props;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const w = document.documentElement.clientWidth;
        setWidth(w);
    }, []);

    return (
        <div>
            <h1>你的浏览器是 {browser.name}</h1>
            <h1>你的浏览器窗口大小是 {width} 像素</h1>
        </div>
    )
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const connect = await getDatabaseConnection();
    console.log('connect', connect);
    const ua = context.req.headers['user-agent'];
    const result = new UAParser(ua).getResult();
    return {
        props: {
            browser: result.browser
        }
    }
};
