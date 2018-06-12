var db  = require('../models');

exports.index = function(req, res) {
  db.Screenshot.findAll({
    where: {
      UserId: req.user.id
    }
  }).then(function(dbScreenshot) {
    console.log(dbScreenshot);
    res.render('screenshots/screenshots', {
      layout: 'main-screenshots',
      screenshot: dbScreenshot
    });
  });
};

exports.createScreenshot = function(req, res) {

  console.log(req.user);
  // Add id from User onto req.body
  req.body.UserId = req.user.id;
  req.body.StreamId= req.user.streamid;

  db.Screenshot.create(req.body).then(function(dbScreen) {
    res.json(dbScreen);
  });
};

