const { Cart, History } = require('../models')

class HistoryController {

  static async createHistory(req, res, next) {
    try {
      const user_id = +req.decoded.id
      const { name, image_url, price, quantity } = req.body
      if (!user_id) throw { name: 'CustomError', message: 'Cart Not Found', status: 404 }
      const history = await History.create({ name, image_url, price, quantity, user_id })
      res.status(201).json(history)
    } catch (error) {
      next(error)
    }
  }

  static async readHistories(req, res, next) {
    try {
      const histories = await History.findAll()
      res.status(200).json(histories)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

}

module.exports = HistoryController