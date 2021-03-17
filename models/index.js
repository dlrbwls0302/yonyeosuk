'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 일대다
// users_items <-> items, users <-> users_items, users <-> board, board <-> images, board <-> comment
const { Board, Comment, Image, Items, User, Users_Item } = sequelize.models;

Board.hasMany(Comment);
Comment.belongsTo(Board);

Board.hasMany(Image);
Image.belongsTo(Board);

User.hasMany(Board);
Board.belongsTo(User);

User.hasMany(Users_Item);
Users_Item.belongsTo(User);

Items.hasMany(Users_Item);
Users_Item.belongsTo(Items);

module.exports = db;
