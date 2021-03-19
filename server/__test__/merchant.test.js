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
            expect(res.body).toHaveProperty('message')
            expect(res.status).toBe(400)
            done()
          })
      })
      
    })
  })
  describe('DELETE /merchants', () => {
    describe('Success process', () => {
      
    })
    describe('Error process', () => {
      
    })
  })
  
  
})