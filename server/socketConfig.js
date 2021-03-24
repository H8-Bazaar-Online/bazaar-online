const io = require('socket.io')()

let player = {}
let players = []

io.on('connection', socket => {
  // console.log(`${socket.id} connected`);
  const id = socket.id
  // player[id] = { state: {name:, input: {x: 0, y: 0}, position: {x: 4, y: 164}}}

  socket.on('ready', state => {
    // console.log(state, '???? State dari client player');
    player = {id, ...state}
    // console.log(player, 'ini player ====');
    // players.push(player)
    players = [...players, player]
    console.log(players, 'ini playerssss ====');
    socket.emit('playerJoin', players)
    socket.broadcast.emit('playerJoin', players)
  })

  socket.on('playerPos', player => {
    console.log(player, '==========');
    // player[id] = { state: {name: username, id: id, input: {x: 0, y: 0}, position: {x: position.x, y: position.y}}}
    // const existingPlayers = players
    // const filtered = players.filter(pl => pl.id !== player.id)
    // console.log(filtered, 'FILTER');
    // players = [ ...filtered, player]
    
    players =JSON.parse(JSON.stringify(players.map(pl => pl.id === player.id ? player : pl)))
    // players = [player, ...filtered]
    // players = []
    console.log(players, 'data filtered MAP');
    io.emit('playerPos', players)
    // socket.broadcast.emit('playerPos', players)
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