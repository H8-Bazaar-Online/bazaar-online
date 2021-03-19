const { User } = require('../models/')

const authorize = function (req, res, next) {
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
        res.status(401).json({ message: "You are not authorize" })
        // next()
      }
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json(err)
      // next(err)
    })
}

module.exports = authorize