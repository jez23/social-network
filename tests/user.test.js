
var User = require('../models/User')
var usersControllers = require('../controllers/usersControllers.js')
var path = require('path')
require('dotenv').config({path: path.join(__dirname, '../settings.env')})
var mongoose = require('mongoose')





describe('Users', function () {
    var user = {
        emailAddress: "hello@world.com",
        password: "password123"
    }
    beforeEach(function(done){
        User.remove({}, function(){
            done()
        })
    })

    beforeAll(function() {
        mongoose.connect(process.env.DATABASE_URL_TEST, {useMongoClient: true}, function(error){
            console.log(error)
        })
    })
    afterAll(function() {
        mongoose.disconnect()
    })
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
        var callback = jest.fn()
        User.login(user, callback)
        expect(spy).toHaveBeenCalledWith(user, callback)
    })
    test('register static is called when we post to the register route', function () {
         var spy = spyOn(User, 'register')
         var req = {
             body: {
                emailAddress: 'hello@world.com',
                password: 'password123',
                confirmPassword: 'password123'
            }
        }
         var res = {}
         var callback = jest.fn()
         usersControllers.register(req, res, callback)
        expect(spy).toHaveBeenCalledWith(req.body, callback)
    })
    test('Register user with matching username and password', function (done) {
        console.log(user)
        var callback = function(){
            User.findOne({}, function (error, result) {
                expect(error).not.toBeTruthy()
                expect(result.emailAddress).toBe(user.emailAddress)
                expect(result.password).toBe(user.password)
                done()
            })
        }
        User.register(user, callback)
    })
   test('register static is called when we post to the register route', function () {
        var spy = spyOn(User, 'register')
        var req = {
            body: {
                emailAddress: 'hello@world.com',
                password: 'password123',
                confirmPassword: 'password123'
            }
        }
        var res = {}
        var callback = jest.fn()
        usersControllers.register(req, res, callback)
        expect(spy).toHaveBeenCalledWith(req.body, callback)
    })
    test('can\'t login if not registered', function (done) {
        User.login(user, function(error, result) {
            expect(error).not.toBeTruthy()
            expect(result).not.toBeTruthy()
            done()
        })
    })
    test('Can login if registered', function (done) {
        User.register(user, function(error, result) {
        User.login(user, function(error, result) {
            expect(error).not.toBeTruthy()
            expect(result).toBeTruthy()
            done()
            })
        })
    })
   test('login static creates a session', function (done) {
  var req = {
    body: {
      emailAddress: 'hello@world.com',
      password: 'password123'
    },
    session: {}
  }
  var res = {}

  User.register(req.body, function (error, result) {
    usersControllers.login(req, res, function () {
      expect(req.session.user).not.toBeUndefined()
      done()
    })
  })
})
});