import {MovieInterface} from "../Interface/ResponsesInterfaces";
import axios from "axios";

export default function useGetMovieList() {
    return (): Promise<MovieInterface[]> => {
        return axios.get('http://localhost:2345')
            .then(res => res.data)
    }
}
