const express = require("express")
const PostController = require("../controllers/postController")
const upload = require("../middlewares/multer")
const authorization = require("../middlewares/authorization")
const postRoute = express.Router()

postRoute.get("/", PostController.showAllPosts)
postRoute.post("/", upload.single("imageUrl"), PostController.addPost)

postRoute.post("/caption", upload.single("imageUrl"), PostController.generateCaption)

postRoute.get("/:PostId", PostController.showDetailPost)
postRoute.put("/:PostId", authorization, PostController.editPost)
postRoute.delete("/:PostId", authorization, PostController.deletePost)

postRoute.get("/:PostId/comment", PostController.showAllComment)
postRoute.post("/:PostId/comment", PostController.addComment)
postRoute.put("/:PostId/like", PostController.addLike)

module.exports = postRoute