const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;