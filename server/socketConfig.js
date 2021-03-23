const io = require('socket.io')()

let player = {}
let players = []

io.on('connection', socket => {
  // console.log(`${socket.id} connected`);
  const id = socket.id
  // player[id] = { state: {name:, input: {x: 0, y: 0}, position: {x: 4, y: 164}}}

  socket.on('ready', state => {
    player = {id, ...state}
    players.push(player)
    socket.emit('playerJoin', players)
    socket.broadcast.emit('playerJoin', players)
  })

  socket.on('playerPos', player => {
    console.log(player, '==========');
    // player[id] = { state: {name: username, id: id, input: {x: 0, y: 0}, position: {x: position.x, y: position.y}}}
    io.emit('playerPos', player)
    socket.broadcast.emit('playerPos', player)
  })


  // socket.on('ready', username => {
  //   console.log(username, '<<<<<<<<');
  //   if (!username) {
  //     console.log('masuk');
  //     socket.disconnect()
  //     return
  //   }
  //   // if (username && ) {
  //   //   console.log('masuk');
  //   //   socket.disconnect()
  //   //   return
  //   // }

  //   player[id] = { state: {name: username, id: id, input: {x: 0, y: 0}, position: {x: 4, y: 164}}}
  //   // console.log(player, '<<<<<<< PLAYUER');
  //   // players2.push(player[id])
  //   // console.log(player, '<<<<<<<<<<<<< OKEEEEE');
    
  //   // io.emit('ready', (players2))
  //   // socket.broadcast.emit('ready', (players2))
  //   io.emit('ready', (player[id]))
  //   // socket.broadcast.emit('ready', (player[id]))
  //   io.emit('playerDisconnected', player[id].state.name)
  // })

  // socket.on('update', player => {
  //   console.log(player);
  // })

  socket.on('message', ({ name, message }) => {
    console.log(name, message, '<<<<<<< MESSAGE');
    io.emit('message', { name, message })
  })

  // socket.on('playerPos', position => {
  //   console.log(position, '==========');
  //   // player[id] = { state: {name: username, id: id, input: {x: 0, y: 0}, position: {x: position.x, y: position.y}}}
  //   socket.broadcast.emit('playerPos', {...player[id].state, position})
  // })

  // socket.on('playerDisconnected', () => {
  // })

  socket.on('disconnect', () => {
    // const onlineUser = players.filter(player => player.id !== id)
    const index = players.findIndex(player => player.id === id)
    players.splice(index, 1)
    socket.broadcast.emit('playerJoin', players)
  })
})

module.exports = io