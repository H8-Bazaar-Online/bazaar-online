const { User, Merchant } = require('../models/')

const authorizeCustomer = function (req, res, next) {
  User.findOne({
    where: {
      email: req.decoded.email
    }
  })
    .then(user => {
      console.log(user.role);
      if (user.role === "merchant") {
        next()
      } else {
        throw { name: 'CustomError', msg: 'not authorized' }
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
    req.merchant = merchant
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {authorizeCustomer, authorizeMerchant}