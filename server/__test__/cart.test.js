const request = require('supertest')
const app = require('../app')
const { sequelize, User, Merchant, Product, History } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

describe('Cart', () => {
  let access_token_cust
  let access_token_merchant
  let product_id
  let user_id
  let cart_id

beforeAll((done) => {
  User.create({
    email: 'cust@mail.com',
    username: 'cust1',
    password: '123123',
    role: 'customer'
    })
    .then(data => {
      user_id = data.id
      const payload = {
        id: data.id,
        email: data.email,
        role: data.role
      }
      access_token_cust = generateToken(payload)
      return User.create({
        email: 'merchant11@mail.com',
        username: 'merchant11',
        password: '123123',
        role: 'merchant'
        })
    })
    .then(data => {
      access_token_merchant = generateToken({id: data.id, email: data.email, role: data.role})
      return Merchant.create({
        name: 'merchant1',
        logo: 'www.merchant1-logo.com',
        category: 'food',
        user_id : data.id
      })
    })
    .then(data => {
      return Product.create({
        name: 'bakso',
        description: 'bakso halus',
        price: 10000,
        stock: 3,
        category: 'food',
        image_url: 'www.bakso.com',
        merchant_id: data.id
      })
    })
    .then(data => {
      product_id = data.id
      done()
    })
    .catch(err => {
      done(err)
    })
  })
  
afterAll((done) => {
  queryInterface.bulkDelete('Carts')
    .then(() => {
      return queryInterface.bulkDelete('Users')
    })
    .then(() => {
      return queryInterface.bulkDelete('Products')
      done()
    })
    .catch(done)
})
  
  describe('POST /carts success', () => {
    test('create success', (done) => {
    request(app)
      .post(`/carts/${product_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_cust)
      .send({user_id: user_id, product_id: product_id, quantity: 1})
      .then(response => {
        const { status, body } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('user_id', expect.any(Number))
        expect(body).toHaveProperty('product_id', expect.any(Number))
        expect(body).toHaveProperty('quantity', expect.any(Number))
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  describe('POST /carts success', () => {
    test('create success', (done) => {
    request(app)
      .post(`/carts/${product_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_cust)
      .send({user_id: user_id, product_id: product_id, quantity: 1})
      .then(response => {
        const { status, body } = response
        cart_id = body.id
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', expect.any(String))
        expect(body).toHaveProperty('id', expect.any(Number))
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  
  describe('POST /history success', () => {
    test('create success', (done) => {
    request(app)
      .post(`/histories/${product_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_cust)
      .send({name: 'tes', image_url: 'jttp', quantity: 1, price: 1000, user_id})
      .then(response => {
        const { status, body } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', expect.any(String))
        expect(body).toHaveProperty('quantity', expect.any(Number))
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  describe('GET ALL /histories', () => {
    describe('Success process', () => {
      test('should return array of histories with status code 200', (done) => {
        request(app)
          .get('/histories/all')
          .set('access_token', access_token_merchant)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(Array.isArray(res.body)).toEqual(true)
            expect(res.status).toBe(200)
            done()
          })
      })
    })
  })
  
  describe('POST /carts failed', () => {
    test('create failed, quantity more than stock', (done) => {
    request(app)
      .post(`/carts/${product_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_cust)
      .send({user_id: user_id, product_id: product_id, quantity: 15})
      .end((err, res) => {
        expect(err).toBe(null)
        expect(res.body).toHaveProperty('message', expect.any(Array))
        expect(res.body.message).toContain('Quantity can\'t more then stock')
        expect(res.status).toBe(400)
        done()
      })
    })

    test('create failed, access_token not exist', (done) => {
    request(app)
      .post(`/carts/${product_id}`)
      .set('Accept', 'application/json')
      .send({user_id: user_id, product_id: product_id, quantity: 1})
      .end((err, res) => {
        expect(err).toBe(null)
        expect(res.body).toHaveProperty('message', expect.any(Array))
        expect(res.body.message).toContain('You are not authenticate')
        expect(res.status).toBe(401)
        done()
      })
    })
  
    test('create failed, access_token isn\'t access token customer', (done) => {
    request(app)
      .post(`/carts/${product_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_merchant)
      .send({user_id: user_id, product_id: product_id, quantity: 1})
      .end((err, res) => {
        expect(err).toBe(null)
        expect(res.body).toHaveProperty('message', expect.any(Array))
        expect(res.body.message).toContain('not authorized')
        expect(res.status).toBe(401)
        done()
      })
    })
  })

  describe('GET /carts success', () => {
    test('get all cart success', (done) => {
    request(app)
      .get(`/carts`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_cust)
      .then(response => {
        const { status, body } = response
        expect(status).toBe(200)
        expect(Array.isArray(body)).toEqual(true)
        expect(status).toBe(200)
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  describe('DELETE /carts', () => {
    test('delete success', (done) => {
    request(app)
      .delete(`/carts/${cart_id}`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_cust)
      .then(response => {
        const { status, body } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
    })

    test('delete error', (done) => {
    request(app)
      .delete(`/carts/9999`)
      .set('Accept', 'application/json')
      .set('access_token', access_token_cust)
      .then(response => {
        const { status, body } = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('message', expect.any(Array))
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })
})