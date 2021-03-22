if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const router = require('./routes/index.js')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))

app.use('/', router)

app.use(errorHandler)


io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

http.listen(PORT, function() {
  console.log(`app listening on port ${PORT}`)
})

// app.listen(PORT, () => {
//   console.log(`app running on port ${PORT}`)
// })

module.exports = app