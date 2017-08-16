var path = require('path')
var userRoutes = require('usersRoutes.js')

var sessions = require('client-sessions')
app.use(sessions({
  cookieName: 'session',
  secret: '123jez123'
}))

require('dotenv').config({
  path: path.join(__dirname, 'settings.env')
})

mongoose.connect(process.env.DATABASE_URL, {
  useMongoClient: true
})


var express = require('express')
var exphbs = require('express-handlebars')


var app = express()

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main'
}))
app.set('view engine', '.hbs')

app.use(express.static('public'))

usersRoutes(app)
app.listen(3000)
