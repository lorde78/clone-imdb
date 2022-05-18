import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import NeedAuth from "./NeedAuth";
import Gigabar_additionnal from "./Gigabar_additionnal";


// @ts-ignore
export default function Gigabar({movieList}) {
    // @ts-ignore
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
            <a href="/"
               className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <svg className="bi me-2" width="40" height="32">
                    <use href="#bootstrap"/>
                </svg>
                <span className="fs-4">Gigabar</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto">

                <Routes>
                    <Route path="*" element={
                        // @ts-ignore
                        <NeedAuth movieList={movieList}>
                            <Gigabar_additionnal/>
                        </NeedAuth>
                    }/>
                </Routes>
            </ul>
        </div>
    )
}