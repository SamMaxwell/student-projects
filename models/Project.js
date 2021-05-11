const { Model, DataTypes } = require('sequelize');
const db = require('../config/db');

class Project extends Model {}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pitch: {
    type: DataTypes.STRING(2000),
  },
},
{
  sequelize: db,
});

module.exports = Project;
