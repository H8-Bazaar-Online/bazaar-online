const { User, Merchant } = require('../models/')

const authorizeCustomer = function (req, res, next) {
  User.findOne({
    where: {
      email: req.decoded.email //nunggu cart
    }
  })
    .then(user => {
      if (user.role === "customer") {
        next()
      } else {
        throw { name: 'CustomError', message: 'not authorized', status: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

const authorizeMerchant = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      where: { user_id: req.decoded.id }
    })
    if (!merchant) throw { name: 'CustomError', message: 'not authorized', status: 401 }
    req.merchant = merchant
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {authorizeCustomer, authorizeMerchant}