const { User, Merchant } = require('../models/')

const authorizeCustomer = function (req, res, next) {
  User.findOne({
    where: {
      email: req.decoded.email
    }
  })
    .then(user => {
      console.log(user.role);
      if (user.role === "customer") {
        next()
      } else {
        res.status(401).json({ message: "You are not authorize" })
      }
    })
    .catch(err => {
      res.status(500).json(err)
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