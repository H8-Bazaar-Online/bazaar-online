const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')

const { sequelize, User, Transaction } = require('../models')
const { queryInterface } = sequelize

let userData = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'secret',
  role: 'customer'
}

let historiesData = {
  name: 'histories name',
  price: 10,
  image_url: 'http://',
  quantity: 10,
  user_id: null
}

describe('Histories routes', () => {
  let userToken
  beforeAll(done => {
    User.create(userData)
      .then(user => {
        userToken = generateToken({ id: user.id, email: user.email, role: user.role }, 'secret')
        historiesData.user_id = user.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .then(() => queryInterface.bulkDelete('Histories', {}))
      .then(() => done())
      .catch(err => done(err))
  })
  describe('GET ALL /histories', () => {
    describe('Success process', () => {
      test('should return array of histories with status code 200', (done) => {
        request(app)
          .get('/histories')
          .set('access_token', userToken)
          .end((err, res) => {

            expect(err).toBe(null)
            expect(Array.isArray(res.body)).toEqual(true)
            expect(res.status).toBe(200)
            done()
          })
      })
    })
  })
})