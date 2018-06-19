var db = require('../models');

exports.index = function (req, res) {
  db.Video_Stream.findAll({
    include: [db.Screenshot],
    where: {
      UserId: req.user.id
    }
  }).then(function (dbStream) {
    console.log(dbStream);
    res.render('homepage/homepage', {
      layout: 'main-streams',
      stream: dbStream,
      helpers: {
        foo: function () { return 'foo.'; }
      }
    });
  }); 
};

exports.createStream = function (req, res) {

  console.log(req.user);
  // Add id from User onto req.body
  req.body.UserId = req.user.id;

  db.Video_Stream.create(req.body).then(function (dbStream) {
    res.json(dbStream);
  });
};

