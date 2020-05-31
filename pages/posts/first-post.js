import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function FirstPost() {
    return (
        <React.Fragment>
            <Head>
                <title>第一篇文章</title>
                <meta name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
            </Head>
            <div> first post
                <hr/>
                回到首页
                <Link href="/">
                    <a>点击这里</a>
                </Link>
            </div>
        </React.Fragment>
    )
}