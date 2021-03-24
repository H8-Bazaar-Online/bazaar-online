const io = require('socket.io-client')
const server = require('../socketConfig');

describe('Suite of unit tests', function () {
  server.attach(3010)
  let socket;

  beforeEach(function (done) {
    // Setup
    socket = io.connect('http://localhost:3010', {
      'reconnection delay': 0
      , 'reopen delay': 0
      , 'force new connection': true
    });

    socket.on('connect', function () {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', function () {
      console.log('disconnected...');
    })
  });

  afterEach(function (done) {
    // Cleanup
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
      console.log('no connection to break...');
    }
    done();

  });
  afterAll(function (done) {
    server.detach()
  })

  describe('Chat tests', function () {
    test('Sending message to the chat', (done) => {
      const data = {
        name: 'Budi',
        message: 'test message'
      }

      socket.emit('message', data)

      socket.on('message', ({ name, message }) => {
        expect(name).toEqual('Budi')
        expect(message).toEqual('test message')
        done()
      })
    })

  })

})