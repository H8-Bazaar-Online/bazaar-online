const io = require('socket.io')()

let player = {}
let players = []

io.on('connection', socket => {
  const id = socket.id
  // socket.on('ready', state => {
  //   console.log(state);
  //   player = {id, ...state}
  //   players = [...players, player]
  //   socket.emit('playerJoin', players)
  //   socket.broadcast.emit('playerJoin', players)
  // })

  // socket.on('playerPos', player => {
  //   console.log(player);
  //   players =JSON.parse(JSON.stringify(players.map(pl => pl.id === player.id ? player : pl)))
  //   io.emit('playerPos', players)
  // })

  socket.on('message', ({ name, message }) => {
    console.log(name, message, '<<<<<<< MESSAGE');
    io.emit('message', { name, message })
  })

  // socket.on('disconnect', () => {
  //   const index = players.findIndex(player => player.id === id)
  //   players.splice(index, 1)
  //   socket.broadcast.emit('playerJoin', players)
  // })
})

module.exports = io