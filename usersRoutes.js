var bodyParser = require('body-parser')
var usersControllers = require('./controllers/usersControllers.js')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var User = require('./models/User')

function usersRoutes(app){
    app.get('/', function (req, res) {
        res.render('home', { currentUser: req.session.user })
    })
       app.get('/register', function (req, res) {
        res.render('register', { currentUser: req.session.user })
    })
    app.post('/register', urlencodedParser, usersControllers.register, function (req, res) {
        console.log(req.body)
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
    app.get('/editprofile', function (req, res) {
  User.findOne({ _id: req.session.user._id }, function (error, result) {
    if (error) {
      res.send('An error occurred')
    } else {
      res.render('editprofile', { currentUser: result })
    }
  })
})

app.post('/editprofile', urlencodedParser, usersControllers.editProfile, function (req, res) {
  res.redirect('/editprofile')
})
app.get('/profiles', function (req, res) {
    console.log("test")
  User.find({}, function (error, result) {
    if (error) {
      res.send('An error occurred')
    } else {
      res.render('profiles', { users: result })
    }
  })
})

app.get('/profiles/:userId', function (req, res) {
  var userId = req.params.userId
  User.findOne({ _id: userId }, function (error, result) {
    if (error) {
      res.send('An error occurred')
    } else {
      res.render('profiles', { user: result })
    }
  })
})

}

module.exports = usersRoutes

