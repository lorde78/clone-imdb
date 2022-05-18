import {NavLink} from "react-router-dom";

export default function Gigabar_additionnal() {
    return (
        <>
            <li className="nav-item">
                <NavLink className="nav-link text-white bi me-2" to="/">Tous les articles</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-white bi me-2" to="/mes-posts">Mes posts</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-white bi me-2" to="/autres-posts">Les autres posts</NavLink>
            </li>
        </>
    )
}