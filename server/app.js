if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const router = require('./routes/index.js')
const app = express()

app.use(express.static(__dirname, { dotfiles: 'allow' }))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))
app.use('/', router)
app.use(errorHandler)

module.exports = app