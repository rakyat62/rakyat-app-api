module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    role: DataTypes.STRING,
  }, {
    tableName: 'user_roles',
  });

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.Organization);
    UserRole.belongsTo(models.User);
  };

  return UserRole;
};
