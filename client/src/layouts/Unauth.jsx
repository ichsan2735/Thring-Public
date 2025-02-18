import { Navigate, Outlet } from "react-router"
export default function Unauth() {
    if (localStorage.access_token) {
        return <Navigate to={"/"} />
    }

    return <Outlet />
}