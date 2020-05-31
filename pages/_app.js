import Head from 'next/head'
import 'styles/global.css'

export default function App({ Component, pageProps }) {
  return <div>
     <Head>
        <title>第一篇文章</title>
        <meta name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
     </Head>
    <Component {...pageProps} />
  </div>
}