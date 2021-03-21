const { User, Merchant } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { username, email, password, role, name, logo, category } = req.body
    let dataUser;
    User.create({ username, email, password, role })
      .then(user => {
        if (role === 'customer') {
          res.status(201).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
          })
        } else {
          dataUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role
          }
          return Merchant.create({ name, logo, category, user_id: dataUser.id })
          .then(merchant => {
            // console.log(merchant);
            res.status(201).json({
              id: merchant.id,
              name: merchant.name,
              user_id: merchant.user_id
            })
          })
        }
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
        res.status(200).json({ access_token, name: user.username })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController