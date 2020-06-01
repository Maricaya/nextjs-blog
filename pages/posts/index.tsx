// 访问 http://localhost:3000/posts
// 客户端渲染，数据本来不在页面上，通过 ajax 请求后渲染到页面上
// 这种方式白屏时间很长
import {NextPage} from 'next';
import axios from 'axios';
import {useEffect, useState} from "react";

type Post = {
    id: string,
    id: string,
    title: string
}
const PostsIndex: NextPage = () => {
    // [] 表示只在第一次渲染的时候请求
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        axios.get('/api/v1/posts').then(response => {
            console.log(response.data);
            setPosts(response.data);
        })
    }, []);
    return (
        <div>
            Posts Index
            {posts.map(p => <div key={p.id}>
                {p.id}
            </div>)}
        </div>
    )
};

export default PostsIndex;
