const app = require("../app")
const request = require("supertest")

const { hashPassword } = require("../helpers/bcrypt")

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
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe('test login', () => {
    describe('test login success', () => {
        test('login success with status 200', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    email: "user1@gmail.com",
                    password: "user1"
                })

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("access_token", expect.any(String))
        })
    })

    describe('test login failed', () => {
        test('without email status 400', async () => {
            const res = await request(app)
            .post('/login')
            .send({
                password: "user1"
            })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("message", "email is required")
        })

        test('without password status 400', async () => {
            const res = await request(app)
            .post('/login')
            .send({
                email: "user1@gmail.com"
            })

            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty("message", "password is required")
        })

        test('invalid email status 401', async () => {
            const res = await request(app)
            .post('/login')
            .send({
                email: "wrongEmail@gmail.com",
                password: "user1"
            })

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "email or password incorrect")
        })

        test('invalid password status 401', async () => {
            const res = await request(app)
            .post('/login')
            .send({
                email: "user1@gmail.com",
                password: "wrongPassword"
            })

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty("message", "email or password incorrect")
        })
    })

    
})
