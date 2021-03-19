const request = require('supertest')
const app = require('../app')
const { sequelize, User, Merchant } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let data = {
    username: 'user1',
    email : 'user1@mail.com',
    password : 'secret',
    merchantName: 'Dagadu',
    logo: 'unsplash.com/lkjljl.jpg',
    category: 'Food'
}

let productData = {
    name: 'Tes Product',
    description: 'ini tes product',
    price: 20000,
    stock: 10,
    image_url: 'http://usplash.com',
    merchant_id: 1
}


describe('Product routes',()=>{
    let userToken, productId, user2Token
    beforeAll(done => {
        User.create({ username: data.username, email: data.email, password: data.password, role: 'merchant' })
          .then(user => {
            userToken = generateToken({ id: user.id, email: user.email, role: user.role }, 'secret')
            user2Token = generateToken({ id: user.id, email: user.email, role: 'customer' }, 'secret')
            let merchantData = {
              name: data.merchantName,
              logo: data.logo,
              category: data.category,
              user_id
            }
            return Merchant.create(merchantData)
          })
          .then(merchant => {
            productData.merchant_id = merchant.id
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
    describe('POST /products',()=> {
        describe('Success process',()=> {
            test('should create a new product with status code 201',(done)=>{
                request(app)
                    .post('/products')
                    .send(productData)
                    .set('access_token', userToken)
                    .end((err,res)=>{

                        productId = res.body.product.id

                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('product', res.body.product)
                        expect(res.body.product).toHaveProperty('id', expect.any(Number))
                        expect(res.body.product).toHaveProperty('name', expect.any(String))
                        expect(res.body.product).toHaveProperty('description', expect.any(String))
                        expect(res.body.product).toHaveProperty('price', expect.any(Number))
                        expect(res.body.product).toHaveProperty('stock', expect.any(Number))
                        expect(res.body.product).toHaveProperty('image_url', expect.any(String))
                        expect(res.body.product).toHaveProperty('merchant_id', expect.any(Number))
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('Error process',()=>{
            test('should send an error wtih status 400 because of name null validation',(done)=>{
                const withoutName = { ...productData }
                delete withoutName.name
                request(app)
                    .post('/products')
                    .send(withoutName)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Name cannot be null')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of empty name validation',(done)=>{
                const emptyName = { ...productData, name: '' }
                request(app)
                    .post('/products')
                    .send(emptyName)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Location is a required field')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of description null validation',(done)=>{
                const withoutDescription = { ...productData }
                delete withoutDescription.description
                request(app)
                    .post('/products')
                    .send(withoutDescription)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Description cannot be null')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 400 because of empty description validation',(done)=>{
                const emptyDescription = { ...productData, description: '' }
                request(app)
                    .post('/products')
                    .send(emptyDescription)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(Array))
                        expect(res.body.message).toContain('Description is a required field')
                        expect(res.body.message.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)  
                        done()
                    })
            })
            test('should send an error wtih status 401 because of not provide the access_token',(done)=>{
                request(app)
                    .post('/products')
                    .send(productData)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'you must login first')
                        expect(res.status).toBe(401)  
                        done()
                    })
            })
        })
    })
    describe('DELETE /products',()=> {
        describe('Error process',()=> {
            test('should send an error with status 401 because invalid access_token',(done)=>{
                request(app)
                    .delete('/products/' + productId)
                    .set('access_token', user2Token) //tokennya si role = customer
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'not authorized')
                        expect(res.status).toBe(401)
                        done()
                    })
            })
            test('should send an error with status 404 if product not found',(done)=>{
                request(app)
                    .delete('/products/99999')
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Product not found')
                        expect(res.status).toBe(404)
                        done()
                    })
            })
        })
        describe('Success process',()=> {
            test('should send a success message with status code 200',(done)=>{
                request(app)
                    .delete('/products/' + productId)
                    .set('access_token', userToken)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Successfully delete data')
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
    })
})
