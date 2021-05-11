const Participant = require('./Participant');
const Project = require('./Project');
const User = require('./User');

Project.belongsToMany(User, { through: Participant });

Project.belongsTo(User, { foreignKey: 'creator' });

Project.belongsTo(User, { foreignKey: 'owner' });

User.hasMany(Project, {
  foreignKey: 'creator',
  onDelete: 'CASCADE',
});

User.hasMany(Project, {
  foreignKey: 'owner',
  onDelete: 'CASCADE',
});

User.belongsToMany(Project, { through: Participant });

module.exports = {
  Participant,
  Project,
  User,
};
