if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const cors = require("cors")
const express = require('express')
const app = express()
const router = require("./routers")
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Thring Server Started!')
})

app.use(router) 
app.use(errorHandler)

module.exports = app