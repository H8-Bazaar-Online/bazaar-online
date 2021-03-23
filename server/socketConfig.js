const io = require('socket.io')()

let players = {}

io.on('connection', socket => {
  // console.log(`${socket.id} connected`);
  const id = socket.id
  // players[id] = { state: {name:, input: {x: 0, y: 0}, position: {x: 4, y: 164}}}

  socket.on('ready', username => {
    // console.log(username, '<<<<<<<<');
    if (!username) {
      console.log('masuk');
      socket.disconnect()
      return
    }
    // if (username && ) {
    //   console.log('masuk');
    //   socket.disconnect()
    //   return
    // }

    players[id] = { state: {name: username, id: id, input: {x: 0, y: 0}, position: {x: 4, y: 164}}}
    // console.log(players, '<<<<<<< PLAYUER');
    // players2.push(players[id])
    console.log(players, '<<<<<<<<<<<<< OKEEEEE');
    
    // io.emit('ready', (players2))
    // socket.broadcast.emit('ready', (players2))
    io.emit('ready', (players[id]))
    socket.broadcast.emit('ready', (players[id]))
    io.emit('playerDisconnected', players[id].state.name)
  })

  socket.on('message', ({ name, message }) => {
    console.log(name, message, '<<<<<<< MESSAGE');
    io.emit('message', { name, message })
  })

  socket.on('playerPos', position => {
    console.log(position, '==========');
    // players[id] = { state: {name: username, id: id, input: {x: 0, y: 0}, position: {x: position.x, y: position.y}}}
    socket.broadcast.emit('playerPos', {...players[id].state, position})
  })

  // socket.on('playerDisconnected', () => {
  // })

  // socket.on('disconnect', () => {
  //   console.log(`${socket.id} disconnected`);
  // })
})

module.exports = io