const { User } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    //   res.send('ini register')
    const { username, email, password, role } = req.body
    User.create({ username, email, password, role })
      .then(user => {
        res.status(201).json({
          msg: 'Register Success',
          id: user.id,
          email: user.email
        })
      })
      .catch(err => {
        res.status(500).json({ err })
        // next(err)
      })
  }

  static login(req, res, next) {
    //   res.send('ini login')
    const { email, password } = req.body
    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) throw { msg: 'Invalid email or password' }
        const comparedPassword = comparePass(password, user.password)
        if (!comparedPassword) throw { msg: 'Invalid email or password' }

        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        const error = err.msg || 'internal server error'
        res.status(500).json({ error })
        // next(err)
      })
  }
}

module.exports = UserController