'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Board.init({
    users_id: DataTypes.INTEGER,
    post_like: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    post_dislike: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'board',
  });
  return Board;
};