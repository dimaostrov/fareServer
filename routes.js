module.exports = function(app){

		var application = require('./routes/application');
		var users = require('./routes/users');
		var homepage = require('./routes/homepage');

		app.use('/', application);
		app.use('/users', users);
		app.use('/homepage', homepage);
    //other routes..
}