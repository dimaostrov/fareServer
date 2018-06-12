'use strict';
var bcrypt = require("bcrypt-nodejs");

<<<<<<< HEAD
module.exports = function (sequelize, DataTypes) {
=======
module.exports = function(sequelize, DataTypes) {
>>>>>>> 1da26609d4ab7134521c852cfd687920e2f301b8
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
<<<<<<< HEAD
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      hooks: {
        beforeCreate: function (user, options, cb) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          cb(null, options);
        }
      }
    });

  User.associate = function (models) {
    models.User.hasMany(models.Screenshot, {
      onDelete: "cascade"
    });
  };

  User.associate = function (models) {
    models.User.hasMany(models.Video_Stream, {
      onDelete: "cascade"
    });
  };

  User.Instance.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
=======
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Trip, {
            onDelete: "cascade"
        });
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    hooks: {
      beforeCreate: function(user, options, cb) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        cb(null, options);
      }
    }
  });
  return User;
};
>>>>>>> 1da26609d4ab7134521c852cfd687920e2f301b8
