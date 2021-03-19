const { User } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { username, email, password, role } = req.body
    User.create({ username, email, password, role })
      .then(user => {
        res.status(201).json({
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) throw { name: 'CustomError', message: 'Invalid Email or Password', status: 400 }
        const comparedPassword = comparePass(password, user.password)
        if (!comparedPassword) throw { name: 'CustomError', message: 'Invalid Email or Password', status: 400 }
        
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController