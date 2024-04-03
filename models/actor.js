const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Actor = sequelize.define('Actor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Actor;
