const { Post } = require("../models")

module.exports = authorization
async function authorization(req, res, next) {
    try {
        const { PostId } = req.params
        const foundPost = await Post.findByPk(+PostId)

        if (!foundPost) throw { name: "NotFound" }
        
        // console.log(`${foundPost.UserId} === ${req.user.id} di auth`);
        
        if (foundPost.UserId !== req.user.id) {
            throw { name: "Forbidden" }
        }

        next()

    } catch (error) {
        next(error)

    }
}

module.exports = authorization