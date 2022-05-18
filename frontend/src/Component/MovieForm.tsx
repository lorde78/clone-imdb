import React, {useState} from "react";
import {LocalMoviePost} from "../Interface/LocalMoviePost";
import usePostMovie from "../Hook/usePostMovie";
import {MovieInterface, LoginResponseInterface} from "../Interface/ResponsesInterfaces";

interface MovieFormPropsInterface {
    loggedUser: LoginResponseInterface,
    setNeedsUpdate: React.Dispatch<boolean>
}

export default function MovieForm({loggedUser, setNeedsUpdate}: MovieFormPropsInterface) {
    const [localMovie, setLocalMovie] = useState<LocalMoviePost>({content: "", title: ""})
    const postMovie = usePostMovie();

    const handleChange = ({target}: any) => {
        setLocalMovie(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (loggedUser.token != null) {
            postMovie(loggedUser.token, localMovie)
                .then(data => {
                    console.log(data)
                    setLocalMovie({content: "", title: ""})
                    setNeedsUpdate(true);
                })
        }
    }

    return (
        <form className='mx-auto' style={{maxWidth: '350px'}} onSubmit={handleSubmit}>
            <h2 className='mb-3 text-center'>Feel like a writer ?</h2>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="title"
                       name='title' onChange={handleChange} value={localMovie.title}/>
                <label htmlFor="floatingInput">Title</label>
            </div>
            <div className="mb-3 form-floating">
                <textarea className="form-control" placeholder="Write here" id="floatingTextarea" name='content'
                          style={{height: '100px'}} onChange={handleChange} value={localMovie.content}/>
                <label htmlFor="floatingTextarea">Content</label>
            </div>
            <button type='submit' className='btn btn-primary w-100'>Send</button>
        </form>
    )
}
