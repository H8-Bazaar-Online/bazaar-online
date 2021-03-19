if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const router = require('./routes/index.js')
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))

app.use('/', router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})

module.exports = app