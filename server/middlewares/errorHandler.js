function errorHandler(error, req, res, next) {
    let status = 500
    let message = "Internal Server Error"

    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        status = 400
        message = error.errors[0].message

    } else if (error.name === "ImageRequired") {
        status = 400
        message = "image is required"

    } else if (error.name === "EmailRequired") {
        status = 400
        message = "email is required"

    } else if (error.name === "PasswordRequired") {
        status = 400
        message = "password is required"

    } else if (error.name === "Unauthenticated") {
        status = 401
        message = "email or password incorrect"

    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        status = 401
        message = "invalid token"

    } else if (error.name === "GoogleFailed") {
        status = 401
        message = "login with your email and password"
    
    } else if (error.name === "Forbidden") {
        status = 403
        message = "you are not authorized"

    } else if (error.name === "NotFound") {
        status = 404
        message = "error not found"

    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler