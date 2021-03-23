if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const router = require('./routes/index.js')
const app = express()
// const http = require('http').createServer(app)
// const io = require('socket.io')(http)

// const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))

app.use('/', router)

app.use(errorHandler)

// io.on('connection', socket => {
//   console.log(`${socket.id} connected`);
//   const id = socket.id
//   players[id] = { state: {name: '', input: {x: 0, y: 0}, position: {x: 4, y: 164}}}

//   socket.on('ready', username => {
//     console.log(username, '<<<<<<<<');
//     if (!username) {
//       console.log('masuk');
//       // socket.disconnect()
//       return
//     }
//     players[id] = { state: {name: username, input: {x: 0, y: 0}, position: {x: 4, y: 164}}}
//     console.log(players[id]);
//     io.emit('ready', (players[id]))
//   })

//   socket.on('message', ({ name, message }) => {
//     io.emit('message', { name, message })
//   })

//   socket.on('playerPos', state => {
//     console.log(state, '++++++++++++++');
//   })

//   // socket.on('disconnect', () => {
//   //   console.log(`${socket.id} disconnected`);
//   // })
// })

// http.listen(PORT, function() {
//   console.log(`app listening on port ${PORT}`)
// })

// app.listen(PORT, () => {
//   console.log(`app running on port ${PORT}`)
// })

module.exports = app