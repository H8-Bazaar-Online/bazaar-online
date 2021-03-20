const { Cart, Product, sequelize } = require('../models/index')

class CartController {
  static getAll(req, res, next) {
    let user_id = req.decoded.id
    Cart.findAll({
      where: {
        user_id,
      },
      order: [['id', 'ASC']],
      attributes: ['id', 'user_id', 'product_id', 'merchant_id', 'quantity'],
      include: [{
        model: Product,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }]
    })
      .then(dataCart => {
        res.status(200).json(dataCart)
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    console.log('masukkk sini cuyy');
    // console.log(req.decoded, '>>>>>>>>>>>');
    console.log(req.merchant, '>>>>>>>>>>>');
    let newCart = {
      user_id: +req.decoded.id,
      product_id: +req.params.product_id,
      // merchant_id: req.merchant.id,
      quantity: 1
    }


    Cart.findOne({ 
      attributes: ['id', 'user_id', 'product_id', 'quantity'],
      where: {
        user_id: newCart.user_id,
        product_id: newCart.product_id,
      },
      include: [{
        model: Product,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }]
    })
      .then(dataCart => {
        if (!dataCart) {
        return Cart.create(newCart, { attributes: ['id', 'user_id', 'product_id', 'quantity'] })
            .then(dataCart => {
              let cart = {
                id: dataCart.id,
                user_id: dataCart.user_id,
                product_id: dataCart.product_id,
                quantity: dataCart.quantity
              }
              res.status(201).json(cart)
            })
            .catch(err => {
              next(err)
            })
        } else {
          if (dataCart.quantity < dataCart.dataValues.Product.stock && dataCart.quantity >= 1) {
            return Cart.update({
              quantity: sequelize.literal('quantity +1')
              },
              {
                where: {
                  user_id: newCart.user_id,
                  product_id: newCart.product_id,
                }
              })
                .then(dataCart => {
                  res.status(200).json({message: 'Quantity has been increased by 1'})
                })
                .catch(err => {
                  next(err)
                })
          } else {
            throw ({name: 'CustomError', message: 'Quantity can\'t more then stock'})
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let id = +req.params.id
    Cart.destroy({
      where: {
        id
      }
    })
      .then(dataCart => {
        if (dataCart === 1){
        res.status(200).json({ message: 'Cart has been deleted' })
        } else {
          throw({name: 'CustomError', status: 404, message: 'Cart Not Found'})
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController