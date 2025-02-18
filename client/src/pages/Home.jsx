import { useEffect, useState } from "react";
import PostCards from "../components/PostCards";
import Swal from "sweetalert2";
import instance from "../config/axiosInstance";

import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../slices/postSlice";

export default function Home() {
    // const [posts, setPosts] = useState([])

    // async function fetchPosts(params) {
    //     try {
    //         const {data} = await instance({
    //             method: "GET",
    //             url: "/post",
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.access_token}`
    //             }
    //         })

    //         setPosts(data)

    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             text: error.response.data.message
    //         })
    //     }
    // }

    // useEffect(() => {
    //     fetchPosts()
    // }, [])

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    return <>
        <main className="main-content">
            {/* cards */}
            <div className="card-container">

                {posts.map(el => <PostCards key={el.id} post={el} fetchPosts={fetchPosts} />)}


            </div>
        </main>
    </>

}   