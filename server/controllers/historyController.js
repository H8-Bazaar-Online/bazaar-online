const { Cart, History } = require('../models')

class HistoryController {

  static async createHistory(req, res, next) {
    try {
      const user_id = +req.decoded.id
      const { name, image_url, price, quantity } = req.body
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
      next(error)
    }
  }

}

module.exports = HistoryController