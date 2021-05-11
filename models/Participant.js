const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Participant = db.define('participants', {
  isCreator: DataTypes.BOOLEAN,
  isCaptain: DataTypes.BOOLEAN,
  isSelected: DataTypes.BOOLEAN,
  pitch: DataTypes.STRING(2000),
});

module.exports = Participant;
