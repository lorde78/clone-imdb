import {LocalCommentPost} from "../Interface/LocalCommentPost";
import {AxiosInstance} from "../Axios/AxiosInstance";

export default function usePostComment() {
    return (token: string,comment: LocalCommentPost) => {
        return AxiosInstance({
            url: '/post-comment.php',
            method: 'post',
            data: new URLSearchParams({
                content: comment.content
            })
        })
            .then(res => res.data)
    }
}
