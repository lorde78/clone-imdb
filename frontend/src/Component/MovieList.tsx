import { MovieInterface } from "../Interface/ResponsesInterfaces";
import Movie from "./Movie";
import { useLocation } from "react-router-dom";
import useGetCookies from "../Hook/useGetCookies";
import * as jose from "jose";

export default function MovieList({ movieList }: { movieList: MovieInterface[] }) {
    let location = useLocation();
    // @ts-ignore
    let from = location.pathname || '/';
    // decode jwt get username
    const jwt = useGetCookies().hetic_token;
    // @ts-ignore
    const userName = jose.decodeJwt(jwt).username;

    switch (from) {
        case "/":
            return (
                <div className='p-5'>
                    <h1 className='text-center mb-5'>Toutes les movies</h1>
                    {movieList.map((movie: MovieInterface) => (<Movie movie={movie} key={movie.id} />))}
                </div>
            )

        case "/mes-posts":
            return (
                <div className='p-5'>
                    <h1 className='text-center mb-5'>Toutes les movies</h1>
                    {movieList.filter(e => e.author === userName).map((movie: MovieInterface) => (<Movie movie={movie} key={movie.id} />))}
                </div>
            )

        case "/autres-posts":
            return (
                <div className='p-5'>
                    <h1 className='text-center mb-5'>Toutes les movies</h1>
                    {movieList.filter(e => e.author != userName).map((movie: MovieInterface) => (<Movie movie={movie} key={movie.id} />))}
                </div>
            )

    }

}
