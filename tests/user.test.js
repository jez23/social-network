
var User = require('../models/User')
var UserControllers = require('../controllers/userControllers.js')

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
     test('Login request user with matching email address and password', function () {
        var spy = spyOn(User, 'findOne')
        var user = {
            emailAddress: "hello@world.com",
            password: "password123"
        }
        var callback = jest.fn()
        User.login(user, callback)
        expect(spy).toHaveBeenCalledWith(user, callback)
    })
    test('Logic static is called when we post to the login route', function () {
        var spy = spyOn(User, 'login')
        var req = {
            body: {
                emailAddress: "hello@world.com",
                password: "password123"
            }
        }
        var res = {}
        userControllers.login(req, res)
        expect(spy),toHaveBeenCalledWith(req.body)
    })
})