const request = require('supertest')
const app = require('../app')
const { sequelize, User, Merchant } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let data = {
  username: 'user1',
  email: 'user1@mail.com',
  password: 'secret',
  merchantName: 'Dagadu',
  logo: 'unsplash.com/lkjljl.jpg',
  category: 'Food'
}
let data2 = {
  username: 'user2',
  email: 'user2@mail.com',
  password: 'secret',
  merchantName: 'Bazol',
  logo: 'unsplash.com/lkjljl.jpg',
  category: 'Electronic'
}

let productData = {
  name: 'Tes Product',
  description: 'ini tes product',
  price: 20000,
  stock: 10,
  image_url: 'http://usplash.com',
  category: 'Snack',
  merchant_id: null
}


describe('Product routes', () => {
  let userToken, productId, user2Token, user3Token
  beforeAll(done => {
    User.create({ username: data.username, email: data.email, password: data.password, role: 'merchant' })
      .then(user => {
        userToken = generateToken({ id: user.id, email: user.email, role: user.role }, 'secret')
        let merchantData = {
          name: data.merchantName,
          logo: data.logo,
          category: data.category,
          user_id: user.id
        }
        return Merchant.create(merchantData)
      })
      .then(merchant => {
        productData.merchant_id = merchant.id
        return User.create({ username: data2.username, email: data2.email, password: data2.password, role: 'customer' })
      })
      .then(user2 => {
        user2Token = generateToken({ id: user2.id, email: user2.email, role: user2.role }, 'secret')
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
      .then(() => {
        sequelize.close()
        done()
      })
      .catch(err => done(err))
  })
  describe('POST /products', () => {
    describe('Success process', () => {
      test('should create a new product with status code 201', (done) => {
        request(app)
          .post('/products')
          .send(productData)
          .set('access_token', userToken)
          .end((err, res) => {

            productId = res.body.id

            expect(err).toBe(null)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', expect.any(String))
            expect(res.body).toHaveProperty('description', expect.any(String))
            expect(res.body).toHaveProperty('price', expect.any(Number))
            expect(res.body).toHaveProperty('stock', expect.any(Number))
            expect(res.body).toHaveProperty('image_url', expect.any(String))
            expect(res.body).toHaveProperty('category', expect.any(String))
            expect(res.body).toHaveProperty('merchant_id', expect.any(Number))
            expect(res.status).toBe(201)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should return error status code 500', (done) => {
        request(app)
          .post('/products/uploadimage')
          .send("sudoku.png")
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('Internal Server Error')
            expect(res.status).toBe(500)
            done()
          })
      })
      test('should send an error wtih status 400 because of empty name validation', (done) => {
        const emptyName = { ...productData, name: '' }
        request(app)
          .post('/products')
          .send(emptyName)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('The Name field is required')
            expect(res.body.message.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('should send an error wtih status 400 because of empty description validation', (done) => {
        const emptyDescription = { ...productData, description: '' }
        request(app)
          .post('/products')
          .send(emptyDescription)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('The Description field is required')
            expect(res.body.message.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('should send an error wtih status 401 because of not provide the access_token', (done) => {
        request(app)
          .post('/products')
          .send(productData)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('You are not authenticate')
            expect(res.status).toBe(401)
            done()
          })
      })
    })
  })
  describe('GET /products', () => {
    describe('Success process', () => {
      test('should return array of products with status code 200', (done) => {
        request(app)
          .get('/products')
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
  describe('GET ONE /products', () => {
    describe('Success process', () => {
      test('should return data product with status code 200', (done) => {
        request(app)
          .get('/products/' + productId)
          .set('access_token', userToken)
          .end((err, res) => {

            expect(err).toBe(null)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', expect.any(String))
            expect(res.body).toHaveProperty('description', expect.any(String))
            expect(res.body).toHaveProperty('price', expect.any(Number))
            expect(res.body).toHaveProperty('stock', expect.any(Number))
            expect(res.body).toHaveProperty('image_url', expect.any(String))
            expect(res.body).toHaveProperty('category', expect.any(String))
            expect(res.body).toHaveProperty('merchant_id', expect.any(Number))
            expect(res.status).toBe(200)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should send an error with status 404 not found', (done) => {
        request(app)
          .get('/products/9999')
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
  describe('UPDATE /products', () => {
    describe('Success process', () => {
      test('should send a success message with status code 200', (done) => {
        const body = {
          name: 'Tes Product Update',
          image_url: 'https://imgurl.com/',
          price: 30000,
          stock: 10
        }
        request(app)
          .put('/products/' + productId)
          .send(body)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('id', expect.any(Number))
            expect(res.body).toHaveProperty('name', expect.any(String))
            expect(res.body).toHaveProperty('description', expect.any(String))
            expect(res.body).toHaveProperty('price', expect.any(Number))
            expect(res.body).toHaveProperty('stock', expect.any(Number))
            expect(res.body).toHaveProperty('image_url', expect.any(String))
            expect(res.body).toHaveProperty('category', expect.any(String))
            expect(res.body).toHaveProperty('merchant_id', expect.any(Number))
            expect(res.status).toBe(200)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should send an error with status 404 if product not found', (done) => {
        const body = {
          name: 'Tes Product Update',
          image_url: 'https://imgurl.com/',
          price: 30000,
          stock: 10
        }
        request(app)
          .put('/products/99999')
          .send(body)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('Error Not Found !!')
            expect(res.status).toBe(404)
            done()
          })
      })
      test('should send an error with status 400 empty name validation', (done) => {
        const body = {
          name: '',
          image_url: 'https://imgurl.com/',
          price: 30000,
          stock: 10
        }
        request(app)
          .put('/products/' + productId)
          .send(body)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('The Name field is required')
            expect(res.status).toBe(400)
            done()
          })
      })
    })
  })
  describe('DELETE /products', () => {
    describe('Success process', () => {
      test('should send a success message with status code 200', (done) => {
        request(app)
          .delete('/products/' + productId)
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Product success to delete!!')
            expect(res.status).toBe(200)
            done()
          })
      })
    })
    describe('Error process', () => {
      test('should send an error with status 401 not authorize', (done) => {
        request(app)
          .delete('/products/' + productId)
          .set('access_token', user2Token)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('not authorized')
            expect(res.status).toBe(401)
            done()
          })
      })
      test('should send an error with status 404 if product not found', (done) => {
        request(app)
          .delete('/products/99999')
          .set('access_token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', expect.any(Array))
            expect(res.body.message).toContain('Error Not Found !!')
            expect(res.status).toBe(404)
            done()
          })
      })
    })

  })

})
