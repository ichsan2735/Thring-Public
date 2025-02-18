const { User, Profile, Post, Comment } = require("../models")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cloudinary = require("cloudinary").v2

class PostController {
    static async showAllPosts(req, res, next) {
        try {
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ["password"] },
                        include: {
                            model: Profile,
                            attributes: ["avatarUrl"]
                        }
                    },
                    {
                        model: Comment,
                        include: {
                            model: User,
                            attributes: { exclude: ["password"] },
                            include: {
                                model: Profile,
                                attributes: ["avatarUrl"]
                            }
                        }
                    }
                ],
                order: [["updatedAt", "desc"]]
            })

            res.status(200).json(posts)

        } catch (error) {
            next(error)
        }
    }

    static async addComment(req, res, next) {
        try {
            const { id } = req.user
            const { PostId } = req.params
            const { comment } = req.body

            const newComment = await Comment.create({
                comment,
                PostId,
                UserId: +id
            })

            res.status(201).json(newComment)

        } catch (error) {
            next(error)
        }
    }

    static async showAllComment(req, res, next) {
        try {
            const { PostId } = req.params

            const foundPost = await Post.findByPk(PostId, {
                attributes: ["id"],
                include: {
                    model: Comment,
                    attributes: ["comment"],
                    include: {
                        model: User,
                        attributes: ["username"],
                        include: {
                            model: Profile,
                            attributes: ["avatarUrl"]
                        }
                    }
                }
            })
            res.status(200).json(foundPost)

        } catch (error) {
            next(error)
        }
    }

    static async addLike(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async generateCaption(req, res, next) {
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            function fileToGenerativePart(file, mimeType) {
                return {
                    inlineData: {
                        data: Buffer.from(file).toString("base64"),
                        mimeType,
                    },
                };
            }

            const prompt = "Generate an Instagram-style caption with maximal of 20 words for this image, and just return the caption without any format";
            const imagePart = fileToGenerativePart(req.file.buffer, "image/png");

            const result = await model.generateContent([prompt, imagePart]);
            // console.log(result.response.text());

            res.status(200).json(result.response.text())

        } catch (error) {
            // console.log(error);

            next(error)
        }
    }

    static async addPost(req, res, next) {
        try {
            // console.log(req.body);
            // console.log(req.file);
            const { id } = req.user
            let { caption, coordinate } = req.body

            if(!req.file) throw { name: "ImageRequired" }

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Return only country name based on this coordinate (${coordinate})`;

            const result = await model.generateContent(prompt);
            // console.log(result.response.text());


            const location = result.response.text()

            // console.log(req.body, `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`);


            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            const base64file = Buffer.from(req.file.buffer).toString("base64")
            // console.log(base64file);
            const hasilUpload = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64file}`, { folder: "Thring", public_id: req.file.originalname })

            const newPost = await Post.create({
                caption,
                imgUrl: hasilUpload.secure_url,
                coordinate,
                location,
                UserId: +id
            })

            res.status(201).json(newPost)

        } catch (error) {
            // console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<<<");

            next(error)
        }
    }

    static async deletePost(req, res, next) {
        try {
            // console.log(`masih`);
            const { PostId } = req.params
            const foundPost = await Post.findByPk(+PostId)

            if (!foundPost) throw { name: "NotFound" }
            
            await Post.destroy({ where: { id: +PostId } })

            res.status(200).json({ message: `Post success to delete` })
        } catch (error) {
            // console.log(error, "<<<<<<<<<<<<<<<<<<<<<< di delete");
            
            next(error)
        }
    }

    static async showDetailPost(req, res, next) {
        try {
            const { PostId } = req.params
            const foundPost = await Post.findByPk(+PostId)

            if (!foundPost) throw { name: "NotFound" }

            res.status(200).json(foundPost)
        } catch (error) {
            next(error)
        }
    }

    static async editPost(req, res, next) {
        try {

            const { PostId } = req.params
            let { imgUrl, caption, coordinate } = req.body

            const foundPost = await Post.findByPk(+PostId)

            if (!foundPost) throw { name: "NotFound" }

            
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Return only country name based on this coordinate (${coordinate})`;

            const result = await model.generateContent(prompt);
            // console.log(result.response.text());
            const location = result.response.text()

            // cloudinary.config({
            //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            //     api_key: process.env.CLOUDINARY_API_KEY,
            //     api_secret: process.env.CLOUDINARY_API_SECRET,
            // });
            // const base64file = Buffer.from(req.file.buffer).toString("base64")
            // console.log(base64file);
            // const hasilUpload = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64file}`, { folder: "Thring", public_id: req.file.originalname })

            const updatedPost = await Post.update({
                caption,
                imgUrl,
                coordinate,
                location,
            }, { where: { id: +PostId }, returning: true })

            res.status(200).json(updatedPost[1][0])

        } catch (error) {
            // console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,");
            
            next(error)
        }
    }

}

module.exports = PostController