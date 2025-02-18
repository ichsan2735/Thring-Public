// import { useEffect, useState } from "react";
// import Comments from "./Comments";
// import instance from "../config/axiosInstance";
// import Swal from "sweetalert2";

// export default function CommentSection({PostId}) {
//     const [comments, setComments] = useState([])
//     const [comment, setComment] = useState('')

    // async function fetchComments() {
    //     try {
    //         const {data} = await instance({
    //             method: "GET",
    //             url: `/post/${PostId}/comment`,
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

//     useEffect(() => {
//         fetchComments()
//     }, [comments])

//     async function submitComment(e) {
//         e.preventDefault()

//         try {
//             const { data } = await instance({
//                 method: "POST",
//                 url: `/post/${PostId}/comment`,
//                 headers: {
//                     Authorization: `Bearer ${localStorage.access_token}`
//                 },
//                 data: { comment }
//             })

//         } catch (error) {
//             Swal.fire({
//                 icon: "error",
//                 text: error.response.data.message
//             })
//         }
//     }
//     return <>
//         {/* card comment side */}
//         <div className="w-80 border-l border-base-100 glass lg:rounded-r-xl">

//             {/* comment card container */}
//             <div className="p-4 h-full flex flex-col justify-between">

//                 {/* title */}
//                 <h3 className="text-md font-bold mb-4">Comments</h3>

//                 {/* comments */}
//                 <div className="flex-1 overflow-y-auto max-h-[400px]">
//                     {comments.map(el => <Comments key={el.id} comment={el} />)}

//                 </div>

//                 {/* comment form input */}
//                 <div className="mt-4 pt-4 border-t border-base-100">
//                     <form className="flex gap-2">
//                         <input
//                             type="text"
//                             placeholder="Add a comment..."
//                             className="input input-bordered flex-1"
//                         />
//                         <button type="submit" className="btn btn-primary btn-sm">
//                             send
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </>
// }