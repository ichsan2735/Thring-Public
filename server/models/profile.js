'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `profile picture is required`
        },
        notEmpty: {
          msg: `profile picture is required`
        }
      },
      defaultValue: `https://res.cloudinary.com/dwpjjefa0/image/upload/v1735784854/pngwing.com_e1itsi.png`
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: `Hi, i'm going to travel the world!`
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `UserId is required`
        },
        notEmpty: {
          msg: `UserId is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};