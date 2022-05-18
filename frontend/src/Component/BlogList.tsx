import { BlogInterface } from "../Interface/ResponsesInterfaces";
import Blog from "./Blog";
import { useLocation } from "react-router-dom";
import useGetCookies from "../Hook/useGetCookies";
import * as jose from "jose";

export default function BlogList({ blogList }: { blogList: BlogInterface[] }) {
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
                    <h1 className='text-center mb-5'>Tous les blogs</h1>
                    {blogList.map((blog: BlogInterface) => (<Blog blog={blog} key={blog.id} />))}
                </div>
            )

        case "/mes-posts":
            return (
                <div className='p-5'>
                    <h1 className='text-center mb-5'>Tous les blogs</h1>
                    {blogList.filter(e => e.author === userName).map((blog: BlogInterface) => (<Blog blog={blog} key={blog.id} />))}
                </div>
            )

        case "/autres-posts":
            return (
                <div className='p-5'>
                    <h1 className='text-center mb-5'>Tous les blogs</h1>
                    {blogList.filter(e => e.author != userName).map((blog: BlogInterface) => (<Blog blog={blog} key={blog.id} />))}
                </div>
            )

    }

}
