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
          return res.status(401).json({
            message: "You are not authenticate"
          })
        } else {
          req.decoded = decoded
          next()
        }
      })

  } catch (err) {
    res.status(401).json(err)
  }
}

module.exports = { authenticate }