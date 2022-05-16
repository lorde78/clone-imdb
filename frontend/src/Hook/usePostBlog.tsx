import {LocalBlogPost} from "../Interface/LocalBlogPost";
import {AxiosInstance} from "../Axios/AxiosInstance";

export default function usePostBlog() {
    return (token: string, blog: LocalBlogPost) => {
        return AxiosInstance({
            url: '/post-blog.php',
            method: 'post',
            data: new URLSearchParams({
                title: blog.title,
                content: blog.content
            })
        })
            .then(res => res.data)
    }
}
