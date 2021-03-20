const request = require('supertest')
const app = require('../app')
const { sequelize, User, Merchant } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let userData = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'secret',
  role: 'merchant'
}

let merchantData = {
  name: 'merchant name',
  logo: 'http://',
  category: 'Fashion',
  user_id: null
}

describe('Merchant routes', () => {
  let userToken, merchantId
  beforeAll(done => {
    User.create(userData)
      .then(user => {
        userToken = generateToken({ id: user.id, email: user.email, role: user.role }, 'secret')
        merchantData.user_id = user.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .then(() => queryInterface.bulkDelete('Merchants', {}))
      .then(() => done())
      .catch(err => done(err))
  })
  describe('POST /merchants', () => {
    describe('Success process', () => {
      test('should create a new merchant with status code 201', (done) => {
        request(app)
          .post('/merchants')
          .send(merchantData)
          .set('access_token', userToken)
          .end((err, res) => {

            merchantId = res.body.id

            expect(err).toBe(null)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', expect.any(String))
            expect(res.body).toHaveProperty('logo', expect.any(String))
            expect(res.body).toHaveProperty('category', expect.any(String))
            expect(res.body).toHaveProperty('user_id', expect.any(Number))
            expect(res.status).toBe(201)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should send an error with status 400 because of empty name validation', (done) => {
        const emptyName = { ...merchantData, name: '' }
        request(app)
          .post('/merchants')
          .send(emptyName)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('The Name field is required')
            expect(res.status).toBe(400)
            done()
          })
      })
      test('should send an error with status 400 because of empty logo validation', (done) => {
        const emptyLogo = { ...merchantData, logo: '' }
        request(app)
          .post('/merchants')
          .send(emptyLogo)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('The Logo field is required')
            expect(res.status).toBe(400)
            done()
          })
      })
      test('should send an error with status 400 because of empty category validation', (done) => {
        const emptyCategory = { ...merchantData, category: '' }
        request(app)
          .post('/merchants')
          .send(emptyCategory)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('The Category field is required')
            expect(res.status).toBe(400)
            done()
          })
      })
    })
  })
  describe('GET ALL /merchants', () => {
    describe('Success process', () => {
      test('should return array of merchants with status code 200', (done) => {
        request(app)
          .get('/merchants')
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
  describe('GET ONE /merchants', () => {
    describe('Success process', () => {
      test('should return data merchant with status code 200', (done) => {
        request(app)
          .get('/merchants/' + merchantId)
          .set('access_token', userToken)
          .end((err, res) => {

            expect(err).toBe(null)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', expect.any(String))
            expect(res.body).toHaveProperty('category', expect.any(String))
            expect(res.body).toHaveProperty('logo', expect.any(String))
            expect(res.body).toHaveProperty('user_id', expect.any(Number))
            expect(res.status).toBe(200)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should send an error with status 404 not found', (done) => {
        request(app)
          .get('/merchants/9999')
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('Data Not Found')
            expect(res.status).toBe(404)
            done()
          })
      })
    })
  })
  describe('PUT /merchants', () => {
    describe('Success process', () => {
      test('should send a success message with status code 200', (done) => {
        const body = {
          name: 'Tes merchant Update',
          logo: 'www',
          category: 'food'
        }
        request(app)
          .put('/merchants/' + merchantId)
          .send(body)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', expect.any(String))
            expect(res.body).toHaveProperty('category', expect.any(String))
            expect(res.body).toHaveProperty('logo', expect.any(String))
            expect(res.body).toHaveProperty('user_id', expect.any(Number))
            expect(res.status).toBe(200)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should send an error with status 404 not found', (done) => {
        const body = {
          name: 'Tes merchant Update',
          logo: 'www',
          category: 'food'
        }
        request(app)
          .put('/merchants/9999')
          .send(body)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('Data Not Found')
            expect(res.status).toBe(404)
            done()
          })
      })
    })
  })
  describe('DELETE /merchants', () => {
    describe('Success process', () => {
      test('should send a success message with status code 200', (done) => {
        request(app)
          .delete('/merchants/' + merchantId)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Merchant is successfully deleted')
            expect(res.status).toBe(200)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should send a error message with status code 404', (done) => {
        request(app)
          .delete('/merchants/9999')
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('Data Not Found')
            expect(res.status).toBe(404)
            done()
          })
      })
    })
  })
  
  
})