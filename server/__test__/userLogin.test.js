const request = require('supertest')
const app = require('../app.js')
const userValid = { username: 'merchant', email: 'merchant@mail.com', password: 'merchant123', role: 'merchant' }

describe('POST /login success', () => {
  test('login success', (done) => {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(userValid)
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
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin@mail.com', password: 'salah123' })
      .then(response => {
        const { status, body } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Invalid Email or Password')
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })

  test('login failed, email does not exist in the database', (done) => {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: 'user@mail.com', password: 'admin123' })
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Invalid Email or Password')
        return done()
      })
      .catch(err => {
        return done(err)
      })
  })

  test('login failed, email/password not empty', (done) => {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({ email: '', password: '' })
      .then(response => {
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Email or password cannot be empty')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})