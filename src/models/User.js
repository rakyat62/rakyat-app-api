module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
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
    User.hasMany(models.IncidentHistory, {
      foreignKey: 'createdBy',
    });
  };

  return User;
};
