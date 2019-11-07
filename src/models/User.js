module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    tableName: 'users',
  });

  User.associate = (models) => {
    User.hasMany(models.Incident, {
      foreignKey: 'createdBy',
    });
    User.belongsToMany(models.Organization, {
      through: models.UserRole,
    });
    User.belongsToMany(models.Incident, {
      through: 'user_upvote_incident',
    });
    User.belongsToMany(models.Incident, {
      through: models.IncidentComment,
    });
  };

  return User;
};
