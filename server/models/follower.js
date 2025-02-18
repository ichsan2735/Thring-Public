'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follower.belongsTo(models.User, {foreignKey: "FollowersId"})
      Follower.belongsTo(models.User, {foreignKey: "FollowingId"})
    }
  }
  Follower.init({
    FollowersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `FollowersId is required`
        },
        notEmpty: {
          msg: `FollowersId is required`
        }
      }
    },
    FollowingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `FollowingId is required`
        },
        notEmpty: {
          msg: `FollowingId is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Follower',
  });
  return Follower;
};