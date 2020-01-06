module.exports = (sequelize, DataTypes) => {
  const IncidentLabel = sequelize.define('IncidentLabel', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
  }, {
    tableName: 'incident_label',
  });

  IncidentLabel.associate = (models) => {
    IncidentLabel.hasMany(models.Incident, {
      foreignKey: {
        field: 'label',
      },
    });
    IncidentLabel.belongsToMany(models.Organization, {
      through: 'organization_related_incident_label',
    });
  };

  return IncidentLabel;
};
