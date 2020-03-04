const { Schema, model } = require('../config/db');
const { isEmail } = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function (email) {
            return isEmail(email);
        }
    },
    password: {
        type: String,
        required: false
    },
    date_joined: {
        type: Date,
        required: true,
        default: new Date()
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = model('users', userSchema);