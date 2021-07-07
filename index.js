// index.js

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport');
const app = express();

//DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODBURL);

let db = mongoose.connection;
db.once('open', function() {
    console.log('DB connected!');
});
db.on('error', function() {
    console.log('DB connection error: ', err);
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret:process.env.Nodejs_sessionSecret, resave:true, saveUninitialized:true}));
//app.use(session({secret:'Mysecret', resave:true, saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

const port = 3000;
app.listen(port, function() {
    console.log('server is running');
});