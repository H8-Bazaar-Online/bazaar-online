const jwt = require('jsonwebtoken')

function generateToken (payload) {
  return jwt.sign(payload, process.env.SECRET_JWT)
}

function verify (access_token) {
  return jwt.verify(access_token, process.env.SECRET_JWT)
}

module.exports = {
  generateToken,
  verify
}