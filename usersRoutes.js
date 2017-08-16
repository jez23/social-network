var bodyParser = require('body-parser')
var usersControllers = require('usersControllers.js')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function usersRoutes(app){
    app.get('/', function (req, res) {
        res.render('home', { currentUser: req.session.user })
    })
       app.get('/register', function (req, res) {
        res.render('register', { currentUser: req.session.user })
    })
    app.post('/register', urlencodedParser, usersControllers.register, function (req, res) {
        res.redirect('/')
    })
    app.get('/login', function (req, res) {
        res.render('login', { currentUser: req.session.user })
    })
    app.post('/login', urlencodedParser, usersControllers.login, function (req, res) {
        res.redirect('/')
    })
   app.get('/logout', usersControllers.logout, function (req, res) {
         res.redirect('/')
    })
}

module.exports('usersRoutes')

