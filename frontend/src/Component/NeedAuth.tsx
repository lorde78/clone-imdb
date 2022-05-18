import useGetCookies from "../Hook/useGetCookies";

// @ts-ignore
export default function NeedAuth({children}) {
    const jwt = useGetCookies();

    if (jwt.hetic_token) {
        return children;
    } else {
        return <></>;
    }
}