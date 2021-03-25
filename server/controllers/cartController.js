const { Cart, Product, sequelize } = require('../models/index')

class CartController {
  static getAll(req, res, next) {
    let user_id = +req.decoded.id
    console.log(user_id, '<<<<<< ID');
    Cart.findAll({
      where: {
        user_id,
      },
      order: [['id', 'ASC']],
      attributes: ['id', 'user_id', 'product_id', 'quantity'],
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

  static create(req, res, next) {;
    console.log(+req.decoded.id, '<<<<<<<< ID');
    let newCart = {
      user_id: +req.decoded.id,
      product_id: +req.params.product_id,
      quantity: 1
    }
    let cart_id

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
        } else {
          cart_id = dataCart.id
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
                  res.status(200).json({message: 'Quantity has been increased by 1', id: cart_id})
                })
          } else {
            throw ({name: 'CustomError', status: 400, message: 'Quantity can\'t more then stock'})
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let id = +req.params.cart_id
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

  static async updateQty(req, res, next) {
    try {
      const {status} = req.body
      // Model.decrement('number', { where: { foo: 'bar' });
      if (status === 'plus') {
        const data = await Cart.increment('quantity', {
          where: {
            id : +req.params.cart_id
          }
        })
        res.status(200).json(data[0][0])
      } else {
        const data = await Cart.decrement('quantity', {
          where: {
            id : +req.params.cart_id
          }
        })
        res.status(200).json(data[0][0])
      }
    } catch (err) {
      next(err)
    }
  }
  

}

module.exports = CartController