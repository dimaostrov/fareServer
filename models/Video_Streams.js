'use strict';

module.exports = function (sequelize, DataTypes) {
  var Video_Stream = sequelize.define('Stream', {
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Video_Stream.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    models.Video_Stream.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Video_Stream.hasMany(models.Screenshot, {
      onDelete: "cascade"
    });


  };
  return Video_Stream;
};