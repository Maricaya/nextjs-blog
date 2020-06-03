import {useEffect, useState} from "react";
import axios from "axios";

export const usePosts = () => {
    // [] 表示只在第一次渲染的时候请求
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/v1/posts').then(response => {
            setTimeout(() => {
                setPosts(response.data);
                if (response.data.length === 0) {
                    setIsEmpty(true);
                }
                setIsLoading(false);
            }, 3000);
        }, () => {
            setIsLoading(true);
        })
    }, []);
    return  {posts, setPosts, isLoading, setIsLoading, isEmpty, setIsEmpty};
};
