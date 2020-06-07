// 访问 http://localhost:3000/posts
// 客户端渲染，数据本来不在页面上，通过 ajax 请求后渲染到页面上
// 这种方式白屏时间很长
import {NextPage} from 'next';
import * as React from "react";
import {usePosts} from "../../hooks/usePosts";
import {useCallback} from "react";

const PostsIndex: NextPage = () => {
    const {isLoading, isEmpty, posts} = usePosts();
    const x = useCallback(() => {
        console.log('x')
    }, []);
    return (
        <div>
            <h1 onClick={x}>文章列表</h1>
            {isLoading ? <div>加载中</div> :
                isEmpty ? <div>没有文章</div>
                    : posts.map(p => <div key={p.id}>
                        {p.id}
                    </div>)}
        </div>
    )
};

export default PostsIndex;
