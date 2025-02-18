const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) throw { name: `Unauthorized` }

        const token = bearerToken.split(" ")[1]
        const payload = verifyToken(token)
        const user = await User.findByPk(payload.id)

        if (!user) throw { name: `Unauthorized` }

        req.user = { id: user.id }
        
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authentication