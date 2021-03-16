const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride=require('method-override');
const index = require('./routes/index');
const user = require('./routes/user');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const auth = require('./routes/auth');
const task = require('./routes/task');
const project = require('./routes/project');
const profile = require('./routes/profile');
const config = require('./config/keys')
const server = require('http').Server(app)



require('./socket-server')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});


app.use('/peerjs', peerServer);


//express-session
app.use(require('express-session')({
    secret: "rusty",
    resave: false,
    saveUninitialized: false
}))




//mongoose connection
mongoose.connect(config.mongoURI, () => {
    console.log("Connected to database")
})


app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname+ "/public"));


//method-override
app.use(methodOverride("_method"));

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



//ejs
app.set('view engine', 'ejs');



//middleware bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//require passport
require("./config/passport");

//locals
app.use(function (req, res, next) {
    res.locals.user = req.user;

    next();
})


//requiring other routes
app.use('/', index);
app.use('/', user);
app.use('/', auth);
app.use('/', task);
app.use('/', project);
app.use('/', profile);





server.listen('5000', () => {
    console.log('server connected');
})


