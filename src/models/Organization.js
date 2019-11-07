module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    isGovernment: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    officeAddress: DataTypes.TEXT,
  }, {
    tableName: 'organizations',
  });

  Organization.associate = (models) => {
    Organization.hasMany(models.Incident, {
      foreignKey: 'assignedTo',
    });
    Organization.belongsToMany(models.User, {
      through: models.UserRole,
    });
    Organization.hasMany(models.IncidentHistory, {
      foreignKey: 'createdBy',
    });
  };

  return Organization;
};
