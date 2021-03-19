const { Merchant, User } = require('../models')

class MerchantController {
  static getAllMerchant(req, res, next) {
    const activeUser = req.decoded.id
    console.log(activeUser);
    Merchant.findAll({
      where: {
        user_id: activeUser
      },
      include: User
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static getMerchantById(req, res, next) {
    const targetedMerchant = req.params.merchantid
    const activeUser = req.decoded.id
    Merchant.findOne({
      where: {
        id: targetedMerchant,
        user_id: activeUser
      },
      include: [User]
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static createMerchant(req, res, next) {
    const activeUser = req.decoded.id
    const { name, logo, category } = req.body
    Merchant.create({
      name,
      logo,
      category,
      user_id: activeUser
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateMerchant(req, res, next) {
    const targetedMerchant = req.params.merchantid
    const activeUser = req.decoded.id
    const { name, logo, category } = req.body
    Merchant.update({
      name,
      logo,
      category,
      user_id: activeUser
    }, {
      where: {
        id: targetedMerchant
      },
      returning: true
    })
      .then(result => {
        if (!result[0]) throw { name: "CustomError", message: 'Data Not Found', status: 404 }
        res.status(200).json(result[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteMerchant(req, res, next) {
    const targetedMerchant = req.params.merchantid
    Merchant.destroy({
      where: {
        id: targetedMerchant
      }
    })
      .then(result => {
        if (!result) throw { name: "CustomError", message: 'Data Not Found', status: 404 }
        let message = "Merchant is successfully deleted"
        res.status(200).json({ message })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = MerchantController