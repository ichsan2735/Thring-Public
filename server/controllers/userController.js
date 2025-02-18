const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User, Profile } = require("../models")
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.headers
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const email = payload.email
            const username = payload.name

            let foundUser = await User.findOne({ where: { email } })
            // console.log(foundUser);
            
            if (!foundUser) {
                foundUser = await User.create({
                    username,
                    email,
                    password: "googleLogin"
                }, 
                { hooks: false })

                const newProfile = await Profile.create({
                    UserId: foundUser.id
                })
                
            } else {
                if(foundUser.password !== 'googleLogin') {
                    throw { name: "GoogleFailed" }
                }
            }

            const access_token = signToken({ id: foundUser.id })

            res.status(200).json({ access_token });

        } catch (error) {
            // console.log(error);

            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const newUser = await User.create({
                username,
                email,
                password
            })

            // console.log(newUser);

            const newProfile = await Profile.create({
                UserId: newUser.id
            })

            res.status(201).json({
                username: newUser.username,
                email: newUser.email
            })

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) throw { name: "EmailRequired" }
            if (!password) throw { name: "PasswordRequired" }

            const foundUser = await User.findOne({ where: { email } })

            if (!foundUser) throw { name: "Unauthenticated" }

            const passwordCheck = comparePassword(password, foundUser.password)

            if (!passwordCheck) throw { name: "Unauthenticated" }

            const access_token = signToken({ id: foundUser.id })

            res.status(200).json({
                access_token
            })

        } catch (error) {
            // console.log(error);

            next(error)
        }
    }

}

module.exports = UserController