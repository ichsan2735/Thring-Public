import { useEffect, useState } from "react";
import Comments from "./Comments";
import Swal from "sweetalert2";
import instance from "../config/axiosInstance";
import { Link } from "react-router";
import { useDispatch } from "react-redux";

export default function PostCards({ post, fetchPosts }) {
    // const [comments, setComments] = useState(post.Comments)
    const [comment, setComment] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post.likes)

    const dispatch = useDispatch();

    // async function fetchComments() {
    //     try {
    //         const {data} = await instance({
    //             method: "GET",
    //             url: `/post/${post.id}/comment`,
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.access_token}`
    //             }
    //         })
    //         setComments(data)

    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             text: error.response.data.message
    //         })
    //     }
    // }

    // function fetchComments() {
    //     setComments()
    // }

    // useEffect(() => {
    //     fetchComments()
    // }, [comments])

    async function submitComment(e) {
        e.preventDefault()

        try {
            const { data } = await instance({
                method: "POST",
                url: `/post/${post.id}/comment`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
                data: { comment }
            })

            // fetchPosts()
            dispatch(fetchPosts())
            setComment('')
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        }
    }

    async function handleLike() {
        try {
            const {data} = await instance({
                method: "PUT",
                url: `/post/${post.id}/like`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setIsLiked(!isLiked)
            setLikeCount(prev => isLiked ? prev - 1 : prev + 1)

        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        }
    }

    async function handleDelete(id) {
        try {
            const {data} = await instance({
                method: "DELETE",
                url: `/post/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            dispatch(fetchPosts())
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        }
    }

    return <>
        {/* card 1*/}
        <div className="card lg:card-side bg-base-300 shadow-xl content-card">
            {/* image */}
            <figure className="lg:w-full h-[300px] lg:h-auto">
                <img
                    src={post.imgUrl}
                    alt="Album"
                    className="w-full h-full object-cover"
                />
            </figure>

            {/* card mid side */}
            <div className="card-body content-card-body">

                {/* user info */}
                <div className="flex gap-4">
                    {/* profpict */}
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={post.User.Profile.avatarUrl} />
                        </div>
                    </div>

                    {/* username */}
                    <h2 className="card-title text-lg font-bold">{post.User.username}</h2>
                </div>

                {/* caption */}
                <div className="flex-1 overflow-y-auto max-h-[400px]">
                    <p className="mt-4 text-base leading-relaxed">
                        {post.caption}
                    </p>
                </div>

                {/* bottom section */}
                <div className="mt-auto">

                    {/* location  */}
                    <p className="text-sm text-gray-500 mb-4">{post.location}</p>

                    {/* interaction */}
                    <div className="card-actions justify-between">

                        {/* like button */}
                        <div className="flex items-center">
                            <button onClick={handleLike} className="btn btn-ghost btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill={isLiked ? "#1eb854" : "none"}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                            <span>{likeCount}</span>
                        </div>

                        {/* right bottom of the mid card */}
                        <div className="card-actions justify-end">

                            {/* edit button */}
                            <Link to={`/edit-post/${post.id}`} className="btn btn-ghost btn-circle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </Link>

                            {/* delete Link */}
                            <button onClick={() => handleDelete(post.id)} className="btn btn-ghost btn-circle hover:bg-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>

                            {/* show map */}
                            <button className="btn btn-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                        fill="#FF4757"
                                        stroke="#FF6B81"
                                        strokeWidth="1.5"
                                    />
                                    <circle cx={12} cy={9} r={3} fill="#FFF" />
                                </svg>
                                <p>show map</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* card comment side */}
            <div className="w-80 border-l border-base-100 glass lg:rounded-r-xl">

                {/* comment card container */}
                <div className="p-4 h-full flex flex-col justify-between">

                    {/* title */}
                    <h3 className="text-md font-bold mb-4">Comments</h3>

                    {/* comments */}
                    <div className="flex-1 overflow-y-auto max-h-[400px]">
                        {post.Comments.map(el => <Comments key={el.id} comment={el} />)}

                    </div>

                    {/* comment form input */}
                    <div className="mt-4 pt-4 border-t border-base-100">
                        <form onSubmit={submitComment} className="flex gap-2">
                            <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                type="text"
                                placeholder="Add a comment..."
                                className="input input-bordered flex-1"
                            />
                            <button type="submit" className="btn btn-primary btn-sm">
                                send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}