const router = require('express').Router();
const { login, register } = require('../services/userService');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), login);

router.post('/register', register);

module.exports = router;
