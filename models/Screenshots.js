'use strict';

module.exports = function (sequelize, DataTypes) {
  var Screenshot = sequelize.define('Screenshot', {
    descriptions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Screenshot.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    models.Screenshot.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Screenshot.belongsTo(models.Video_Stream, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Screenshot;
};