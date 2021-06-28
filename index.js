// index.js

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
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
//app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));

const port = 3000;
app.listen(port, function() {
    console.log('server is running');
});