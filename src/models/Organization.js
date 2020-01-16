module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: DataTypes.STRING,
    isGovernment: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    officeAddress: DataTypes.TEXT,
    logoUrl: DataTypes.STRING,
  }, {
    tableName: 'organizations',
  });

  Organization.associate = (models) => {
    Organization.belongsToMany(models.User, {
      through: models.UserRole,
    });
    Organization.belongsToMany(models.IncidentLabel, {
      through: 'organization_related_incident_label',
    });
  };

  return Organization;
};
