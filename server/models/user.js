'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment)
      User.hasMany(models.Post)
      User.hasMany(models.Follower, {foreignKey: "FollowersId"})
      User.hasMany(models.Follower, {foreignKey: "FollowingId"})
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `username already taken`
      },
      validate: {
        notNull: {
          msg: `username is required`
        },
        notEmpty: {
          msg: `username is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `email already taken`
      },
      validate: {
        notNull: {
          msg: `email is required`
        },
        notEmpty: {
          msg: `email is required`
        },
        isEmail: {
          args: true,
          msg: `email is not correct`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `password is required`
        },
        notEmpty: {
          msg: `password is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, option) {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};