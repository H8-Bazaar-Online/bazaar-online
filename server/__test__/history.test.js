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

  describe('POST /histories success', () => {
    test('create success', (done) => {
    request(app)
      .post(`/histories`)
      .set('access_token', userToken)
      .send(historiesData)
      .then(response => {
        const { status, body } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', expect.any(String))
        expect(body).toHaveProperty('price', expect.any(Number))
        expect(body).toHaveProperty('quantity', expect.any(Number))
        expect(body).toHaveProperty('image_url', expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })
  describe('POST /histories fail', () => {
    test('should return error with status 400', (done) => {
    request(app)
      .post(`/histories`)
      .set('access_token', userToken)
      .send({ ...historiesData, name: '' })
      .end((err, res) => {
        expect(err).toBe(null)
        expect(res.body).toHaveProperty('message', expect.any(Array))
        expect(res.body.message).toContain('The Name field is required')
        expect(res.body.message.length).toBeGreaterThan(0)
        expect(res.status).toBe(400)
        done()
      })
    })
  })
})