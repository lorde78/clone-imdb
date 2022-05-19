import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import useLogin from "./Hook/useLogin";
import { MovieInterface, LoginResponseInterface } from "./Interface/ResponsesInterfaces";
import { LocalUserInterface } from "./Interface/LocalUserInterface";
import LoginForm from "./Component/LoginForm";
import HideIfLogged from "./Component/HideIfLogged";
import useRegister from "./Hook/useRegister";
import useGetMovieList from "./Hook/useGetMovieList";
import MovieList from "./Component/MovieList";
import HideIfNotLogged from "./Component/HideIfNotLogged";
import CommentForm from "./Component/CommentForm";
import useGetCookies from "./Hook/useGetCookies";
import useEraseCookie from "./Hook/useEraseCookie";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NeedAuth from "./Component/NeedAuth";
import Gigabar from "./Component/Gigabar";

import {createStore } from 'redux'
// // @ts-ignore
import RegisterReducer from './Reducers/RegisterReducer'

const store = createStore(RegisterReducer)

export default function App() {
    const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
        status: 'error',
        token: "",
        username: ""
    })
    const [localUser, setLocalUser] = useState<LocalUserInterface>({ password: "", username: "" })
    const [movieList, setMovieList] = useState<MovieInterface[]>([])
    // Determines if the user wants to LogIn or to Register
    const [needsLogin, setNeedsLogin] = useState<boolean>(true)
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    const login = useLogin();
    const register = useRegister();
    const getMovieList = useGetMovieList();
    const cookies = useGetCookies();
    const eraseCookie = useEraseCookie();

    useEffect(() => {
        if (Object.keys(cookies).includes('hetic_token') && Object.keys(cookies).includes('hetic_username')) {
            console.log('got cookies !', loggedUser)
            setLoggedUser(prev => ({
                ...prev,
                username: cookies.hetic_username,
                token: cookies.hetic_token
            }))
        }
    }, [])

    useEffect(() => {
        if (needsLogin && localUser.username !== '') {
            console.log('login ?')
            login(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        } else if (!needsLogin && localUser.username !== '') {
            console.log('register ?', localUser.username)
            register(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        }
    }, [localUser])

    useEffect(() => {
        getMovieList()
            .then(data => {
                setMovieList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])

    const handleDisconnect = () => {
        setLoggedUser({
            status: 'error',
            token: "",
            username: ""
        });
        eraseCookie();
    }

    return (
        <BrowserRouter>
             <Gigabar movieList={movieList}/>

            <div className='container mt-5'>
                <HideIfLogged loggedUser={loggedUser}>
                    <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin} />
                </HideIfLogged>

                <HideIfNotLogged loggedUser={loggedUser}>
                    <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
                    <CommentForm loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate} />
                </HideIfNotLogged>

                <Routes>
                    <Route path='/' element={
                        <NeedAuth>
                            <MovieList movieList={movieList} />
                        </NeedAuth>
                    } />
                    <Route path="/" element={<MovieList movieList={movieList} />} />
                    <Route path="/mes-posts/" element={
                        <NeedAuth>
                            <MovieList movieList={movieList} />
                        </NeedAuth>
                    } />
                    <Route path="/autres-posts/" element={
                        <NeedAuth>
                            <MovieList movieList={movieList} />
                        </NeedAuth>
                    } />
                </Routes>
            </div>
        </BrowserRouter>

    )
}
