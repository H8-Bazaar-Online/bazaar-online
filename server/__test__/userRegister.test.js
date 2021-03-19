const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


const userValid = { username: 'Merchant', email: 'admin.merchant@mail.com', password: 'admin123', role: 'merchant' }
const userFieldEmpty = { username: '', email: '', password: '', role: 'merchant' }
const userWrongTypeData = { username: 123, email: true, password: 'admin123', role: 'admin' }


afterAll(done => {
  queryInterface
    .bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err))
})

describe('POST /register success', () => {
  test('register success', (done) => {
    request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(userValid)
      .then(response => {
        const { status, body } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('email', expect.any(String))
        expect(body).toHaveProperty('username', expect.any(String))
        expect(body).toHaveProperty('role', expect.any(String))
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })
})

describe('POST /register failed', () => {
  test('register failed, field empty', (done) => {
    request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(userFieldEmpty)
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(Array.isArray(body.message)).toEqual(true)
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })

  test('register failed,  type data is wrong', (done) => {
    request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(userWrongTypeData)
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(Array.isArray(body.message)).toEqual(true)
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })
})