import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import instance from "../config/axiosInstance"
import { Link, useNavigate } from "react-router"

export default function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const { data } = await instance({
                method: "POST",
                url: "/register",
                data: {
                    username,
                    email,
                    password
                }
            })

            Swal.fire({
                icon: "success",
                text: `${data.username} has been created!`
            })

            navigate('/login')

        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        }
    }

    async function handleCredentialResponse(response) {
        try {
            // console.log("Encoded JWT ID token: " + response.credential);

            const google_token = response.credential
            const { data } = await instance({
                method: "POST",
                url: "/login/google",
                headers: {
                    google_token
                }
            })

            localStorage.setItem("access_token", data.access_token)
            navigate("/")
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        }
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt();
    }, [])

    return <>
        {/* main container */}
        <div className="main-container">
            {/* logo */}
            <img
                className="logo"
                src="https://res.cloudinary.com/dwpjjefa0/image/upload/v1735569247/Untitled-1-Recovered_v0zxeq.png"
                alt=""
            />
            {/* card */}
            <div className="card bg-primary text-primary-content w-80">
                {/* card body */}
                <div className="card-body centered-card-body">
                    {/* title */}
                    <h2 className="card-title">JOIN US</h2>
                    {/* form */}
                    <form onSubmit={handleSubmit} className="form-control w-full max-w-xs form-custom">
                        {/* label */}
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        {/* username */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="white"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="grow" />
                        </label>
                        {/* label */}
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        {/* email */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="white"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="grow" />
                        </label>
                        {/* label */}
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        {/* password */}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="white"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="grow" />
                        </label>
                        {/* action */}
                        <div className="card-actions justify-end action-container">
                            {/* submit */}
                            <button
                                className="btn hover:bg-white hover:text-black"
                                type="submit"
                            >
                                Register
                            </button>
                            {/* google */}
                            <div id="buttonDiv"></div>
                        </div>
                    </form>
                    {/* link */}
                    <div className="login-link-container">
                        <p>already has account?</p>
                        <Link to={'/login'} className="btn-link login-link hover:text-white">
                            login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>

}