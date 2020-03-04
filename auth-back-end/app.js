const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const usersRouter = require('./routes/userRoutes');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const User = require('./domain/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Pepsi';
opts.algorithms = ['HS256'];

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.sub, function (err, user) {
        console.log(err, user);
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.use('/users', usersRouter);
app.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.send('bloop');
})
module.exports = app;
