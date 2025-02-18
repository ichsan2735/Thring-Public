'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User)
      Post.hasMany(models.Comment)
    }
  }
  Post.init({
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `image is required`
        },
        notEmpty: {
          msg: `image is required`
        }
      }
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `caption is required`
        },
        notEmpty: {
          msg: `caption is required`
        }
      }
    },
    coordinate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `coordinate is required`
        },
        notEmpty: {
          msg: `coordinate is required`
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `location is required`
        },
        notEmpty: {
          msg: `location is required`
        }
      }
    },
    likes: {
      type: DataTypes.STRING,
      defaultValue: 0
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
    modelName: 'Post',
  });
  return Post;
};