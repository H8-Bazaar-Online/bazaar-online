const { verify } = require('../helpers/jwt')
const { User } = require('../models')

function authenticate(req, res, next) {
  let access_token = req.headers.access_token

  try {
    const decoded = verify(access_token)

    User.findOne({
      where: {
        id: decoded.id
      }
    })
      .then(user => {
        if (!user) {
          throw { name: 'CustomError', message: "You are not authenticate", status: 401 }
        } else {
          req.decoded = decoded
          next()
        }
      })

  } catch (err) {
    next({ name: 'CustomError', message: "You are not authenticate", status: 401 })
  }
}

module.exports = { authenticate }