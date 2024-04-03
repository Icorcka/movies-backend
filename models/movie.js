const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Movie = sequelize.define('Movie', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  releaseYear: { type: DataTypes.INTEGER },
  format: { type: DataTypes.ENUM('VHS', 'DVD', 'Blu-ray') },
  isImported: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Movie;
