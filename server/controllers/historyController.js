const { History, Product } = require('../models')

class HistoryController {
  static async createHistory(req, res, next) {
    const productId = +req.params.productId
    const user_id = +req.decoded.id
    const { name, image_url, quantity, price } = req.body
    try {
      const product = await Product.findByPk(productId)
      if (product.stock < 1) throw { name: 'CustomError', message: 'Out of Stock', status: 404 }

      const decrement = await product.decrement('stock', { by: quantity })
      if (!decrement) throw { name: 'CustomError', message: 'Product Not Found', status: 404 }

      const history = await History.create({ name, image_url, quantity, price, user_id })
      res.status(201).json(history)
    } catch (err) {
      next(err)
    }
  }

  static async readHistories(req, res, next) {
    try {
      const histories = await History.findAll()
      res.status(200).json(histories)
    } catch (error) {
      next(error)
    }
  }

  static async readHistoriesByCustomer(req, res, next) {
    try {
      const user_id = +req.decoded.id
      const histories = await History.findAll({where: {user_id}})
      res.status(200).json(histories)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = HistoryController