const isAuth = require('../config/middleware/isAuthenticated');

exports.index = function(req, res) {
    res.render('index');
};