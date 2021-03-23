const io = require('socket.io')()

let players = {}

io.on('connection', socket => {
  // console.log(`${socket.id} connected`);
  // const id = socket.id
  // players[id] = { state: {name: '', input: {x: 0, y: 0}, position: {x: 4, y: 164}}}

  // socket.on('ready', username => {
  //   console.log(username, '<<<<<<<<');
  //   if (!username) {
  //     console.log('masuk');
  //     // socket.disconnect()
  //     return
  //   }
  //   players[id] = { state: {name: username, input: {x: 0, y: 0}, position: {x: 4, y: 164}}}
  //   console.log(players[id]);
  //   io.emit('ready', (players[id]))
  // })

  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })

  // socket.on('playerPos', state => {
  //   console.log(state, '++++++++++++++');
  // })
})

module.exports = io