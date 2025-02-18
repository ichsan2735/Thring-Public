const app = require("../app")
const request = require("supertest")

const { hashPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")

const { sequelize } = require("../models")
const { queryInterface } = sequelize

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [
        {
            username: "user1",
            email: "user1@gmail.com",
            password: hashPassword("user1"),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: "user2",
            email: "user2@gmail.com",
            password: hashPassword("user2"),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            username: "user3",
            email: "user3@gmail.com",
            password: hashPassword("user3"),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])

    accessToken = signToken({ id: 1 })
    accessToken_user2 = signToken({ id: 2 })

    let posts = require("../data/posts.json").map(el => {
        el.createdAt = el.updatedAt = new Date()
        return el
    })

    await queryInterface.bulkInsert("Posts", posts, {})
})

afterAll(async () => {
    await queryInterface.bulkDelete("Posts", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe("create post", () => {
    // describe("success", () => {
    //     test("success 201", async () => {
    //         const res = await request(app)
    //             .post("/posts")
    //             .set("authorization", `Bearer ${accessToken}`)
    //             .send({

    //             })

    //         expect(res.status).toBe(201)

    //         expect(res.body).toBeInstanceOf(Object)
    //         expect(res.body).toHaveProperty("id", expect.any(Number))
    //         expect(res.body).toHaveProperty("name", "bajuTesting")
    //         expect(res.body).toHaveProperty("description", "ini bajuTesting")
    //         expect(res.body).toHaveProperty("price", 75000)
    //         expect(res.body).toHaveProperty("stock", 5)
    //         expect(res.body).toHaveProperty("imgUrl", "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/8/27/f76d131f-1a5b-4f52-ad72-abb2f0482537.jpg")
    //         expect(res.body).toHaveProperty("categoryId", 1)
    //         expect(res.body).toHaveProperty("authorId", expect.any(Number))
    //     })

    // })

    describe("failed", () => {
        test("failed not login 401", async () => {
            const res = await request(app)
                .post("/post")
                .send({
                    caption: "ini caption"
                })

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "invalid token")
        })

        test("failed invalid token 401", async () => {
            const res = await request(app)
                .post("/post")
                .set("authorization", "Bearer wrongToken")
                .send({
                    caption: "ini caption"
                })

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "invalid token")
        })

        test("failed validation error 400", async () => {
            const res = await request(app)
                .post("/post")
                .set("authorization", `Bearer ${accessToken}`)
                .send({
                    //*no image input
                    caption: "ini caption",
                    coordinate: "123, 456"
                })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("message", "image is required")
        })
    })


})

describe("update products", () => {
    describe("success", () => {
        test("success 200", async () => {
            const res = await request(app)
                .put("/post/1")
                .set("authorization", `Bearer ${accessToken}`)
                .send({
                    imgUrl: "https://awsimages.detik.net.id/community/media/visual/2021/07/19/sapi-limosin.jpeg?w=1200",
                    caption: "ini caption edit",
                    coordinate: "-30.258804, -62.859582"
                })

            expect(res.status).toBe(200)

            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty("id", expect.any(Number))
            expect(res.body).toHaveProperty("caption", "ini caption edit")
            expect(res.body).toHaveProperty("imgUrl", "https://awsimages.detik.net.id/community/media/visual/2021/07/19/sapi-limosin.jpeg?w=1200")
            expect(res.body).toHaveProperty("coordinate", "-30.258804, -62.859582")
            expect(res.body).toHaveProperty("UserId", expect.any(Number))
        })
    })

    describe("failed", () => {
        test("failed not login 401", async () => {
            const res = await request(app)
                .put("/post/1")
                .send({
                    imgUrl: "https://awsimages.detik.net.id/community/media/visual/2021/07/19/sapi-limosin.jpeg?w=1200",
                    caption: "ini caption edit",
                    coordinate: "-30.258804, -62.859582"
                })

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "invalid token")

        })

        test("failed invalid token 401", async () => {
            const res = await request(app)
                .put("/post/1")
                .set("authorization", "Bearer wrongToken")
                .send({
                    imgUrl: "https://awsimages.detik.net.id/community/media/visual/2021/07/19/sapi-limosin.jpeg?w=1200",
                    caption: "ini caption edit",
                    coordinate: "-30.258804, -62.859582"
                })

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "invalid token")

        })

        test("failed not found 404", async () => {
            const res = await request(app)
                .put("/post/0")
                .set("authorization", `Bearer ${accessToken}`)
                .send({
                    imgUrl: "https://awsimages.detik.net.id/community/media/visual/2021/07/19/sapi-limosin.jpeg?w=1200",
                    caption: "ini caption edit",
                    coordinate: "-30.258804, -62.859582"
                })

            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty("message", "error not found")

        })

        test("failed not authorized 403", async () => {
            const res = await request(app)
                .put("/post/1")
                .set("authorization", `Bearer ${accessToken_user2}`)
                .send({
                    imgUrl: "https://awsimages.detik.net.id/community/media/visual/2021/07/19/sapi-limosin.jpeg?w=1200",
                    caption: "ini caption edit",
                    coordinate: "-30.258804, -62.859582"
                })

            expect(res.status).toBe(403)
            expect(res.body).toHaveProperty("message", "you are not authorized")

        })

        test("failed validation error 400", async () => {
            const res = await request(app)
                .put("/post/1")
                .set("authorization", `Bearer ${accessToken}`)
                .send({
                    //*no imgUrl input
                    imgUrl: "",
                    caption: "ini caption edit",
                    coordinate: "-30.258804, -62.859582"
                })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("message", "image is required")
        })

        test("failed validation error 400", async () => {
            const res = await request(app)
                .put("/post/1")
                .set("authorization", `Bearer ${accessToken}`)
                .send({
                    //*no caption input
                    imgUrl: "image",
                    caption: "",
                    coordinate: "-30.258804, -62.859582"
                })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("message", "caption is required")
        })

    })
})

describe("delete products", () => {
    describe("success", () => {
        test("success 200", async () => {
            const res = await request(app)
                .delete("/post/3")
                .set("authorization", `Bearer ${accessToken_user2}`)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("message", "Post success to delete")
        })
    })

    describe("failed", () => {
        test("failed not login 401", async () => {
            const res = await request(app)
                .delete("/post/2")

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "invalid token")

        })

        test("failed invalid token 401", async () => {
            const res = await request(app)
                .delete("/post/2")
                .set("authorization", `Bearer wrongToken`)

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "invalid token")

        })

        test("failed not found 404", async () => {
            const res = await request(app)
                .delete("/post/0")
                .set("authorization", `Bearer ${accessToken}`)

            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty("message", "error not found")

        })

        test("failed not authorized 403", async () => {
            const res = await request(app)
                .delete("/post/1")
                .set("authorization", `Bearer ${accessToken_user2}`)

            expect(res.status).toBe(403)
            expect(res.body).toHaveProperty("message", "you are not authorized")

        })


    })
})