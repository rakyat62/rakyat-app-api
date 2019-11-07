module.exports = (sequelize, DataTypes) => {
  const Incident = sequelize.define('Incident', {
    information: DataTypes.TEXT,
    status: DataTypes.STRING,
    locationAddress: DataTypes.STRING,
    locationLat: DataTypes.DECIMAL(11, 2),
    locationLng: DataTypes.DECIMAL(11, 2),
  }, {
    tableName: 'incidents',
  });

  Incident.associate = (models) => {
    Incident.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
    Incident.belongsTo(models.IncidentLabel, {
      foreignKey: 'label',
    });
    Incident.belongsTo(models.Organization, {
      foreignKey: 'assignedTo',
    });
    Incident.hasMany(models.IncidentHistory, {
      foreignKey: 'incidentId',
    });
    Incident.belongsToMany(models.User, {
      through: 'user_upvote_incident',
    });
    Incident.belongsToMany(models.User, {
      through: models.IncidentComment,
    });
  };

  return Incident;
};
