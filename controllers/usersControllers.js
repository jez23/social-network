var User = require('../models/User')

var usersControllers= {

   login: function (req, res, next) {
  User.login(req.body, function (error, result) {
    if (!error) {
      req.session.user = result
      next()
    }
  })
},
   register: function (req, res, next) {
  User.register(req.body, next)
}
}

module.exports = usersControllers