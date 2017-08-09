
var mongoose = require('mongoose')
var validator = require('validator')

var UserSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: [true, 'Email address is required.'],
        validate: [function (value) {
            return validator.isEmail(value)
        }, 'Email address is not valid.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    }
})

UserSchema.statics = { 
    login: function (user, callback) {
      return User.findOne(user, callback)
    },
    register: function (user, callback) {
        const newUser = new this(user)
        newUser.save(callback)
 }}



var User = mongoose.model('User', UserSchema)
module.exports = User

