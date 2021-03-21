const request = require('supertest')
const app = require('../app.js')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

let data = {
  email : 'merchant@mail.com',
  username: 'user1',
  role: 'merchant',
  password : 'merchant123'
}

describe('POST /login success', () => {
  beforeAll(done => {
    User.create(data)
      .then(_ => {
        done()
      })
      .catch(err => {
        done(err)
      })
})
afterAll((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(_ => done())
      .catch(err => done(err))
})
  test('login success', (done) => {
    request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({ email: 'merchant@mail.com', password: "merchant123" })
      .then(response => {
        const { status, body } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })
})

describe('POST /login failed', () => {
  test('login failed, wrong password', (done) => {
    request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin@mail.com', password: 'salah123' })
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', expect.any(Array))
        expect(body.message).toContain('Invalid Email or Password')
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })

  test('login failed, email does not exist in the database', (done) => {
    request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({ email: 'user@mail.com', password: 'admin123' })
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', expect.any(Array))
        expect(body.message).toContain('Invalid Email or Password')
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })

  test('login failed, email/password not empty', (done) => {
    request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({ email: '', password: '' })
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', expect.any(Array))
        expect(body.message).toContain('Invalid Email or Password')
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })
})