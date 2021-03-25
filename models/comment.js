'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    boardId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    comment_like: {
      type: DataTypes.INTEGER,
      defaultValue: 0    
    },
    comment_dislike: {
      type: DataTypes.INTEGER,
      defaultValue: 0    
    }
  }, {
    sequelize,
    modelName: 'comment',
  });
  return Comment;
};