import {MovieInterface} from "../Interface/ResponsesInterfaces";

export default function Movie({movie}: { movie: MovieInterface }) {
    return (
        <div className='bg-light rounded p-3 mb-3'>
            <h3>{movie.title}</h3>
            <p>
                <small>
                    Par : {movie.author}
                    <br/>
                    Le : {movie.date}
                </small>
            </p>
            <p>{movie.content}</p>
        </div>
    )
}
