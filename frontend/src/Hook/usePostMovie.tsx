import {LocalMoviePost} from "../Interface/LocalMoviePost";
import {AxiosInstance} from "../Axios/AxiosInstance";

export default function usePostMovie() {
    return (token: string, movie: LocalMoviePost) => {
        return AxiosInstance({
            url: '/post-movie.php',
            method: 'post',
            data: new URLSearchParams({
                title: movie.title,
                content: movie.content
            })
        })
            .then(res => res.data)
    }
}
