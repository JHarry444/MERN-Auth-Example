const User = require('../domain/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config.json');

const services = {
    login: function (req, res) {
        const token = jwt.sign({ sub: req.user.id }, SECRET, { algorithm: 'HS256' });
        res.send(token);
    },
    register: function (req, res) {
        User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).send(err.message);
            }

            passport.authenticate('local')(req, res, function () {
                const token = jwt.sign({ sub: req.user.id }, SECRET, { algorithm: 'HS256' });
                res.status(201).send({ greeting: 'hello ' + req.user.username, token: token });
            });
        });
    }
};

module.exports = services;