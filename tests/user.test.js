
var User = require('../models/User')

describe('Users', function () {
    test('email is required', function () {
        var user = new User()
        var error = user.validateSync()
        expect(error).not.toBeUndefined()
        expect(error.errors.emailAddress.message).toBe('Email address is required.')
    })
     test('Password is required', function () {
        var user = new User()
        var error = user.validateSync()
        expect(error).not.toBeUndefined()
        expect(error.errors.password.message).toBe('Password is required.')
    })
    test('Checks email address is valid', function () {
        var user = new User({emailAddress: 'Hello'})
        var error = user.validateSync()
        expect(error).not.toBeUndefined()
        expect(error.errors.emailAddress.message).toBe('Email address is not valid.')
    })
})