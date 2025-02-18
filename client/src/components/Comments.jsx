export default function Comments({ comment }) {
    // console.log(comment);
    
    return <>
        {/* comment */}
        <div className="mb-4 flex items-start">

            {/* profpict */}
            <div className="avatar scale-75">
                <div className="w-12 rounded-full">
                    <img src={comment.User.Profile.avatarUrl} />
                </div>
            </div>

            <div className="flex flex-col">
                <div className="font-bold text-sm">{comment.User.username}</div>
                <div className="text-xs">
                    {comment.comment}
                </div>
            </div>

        </div>
    </>
}