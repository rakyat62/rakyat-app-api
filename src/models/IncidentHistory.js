module.exports = (sequelize, DataTypes) => {
  const IncidentHistory = sequelize.define('IncidentHistory', {
    information: DataTypes.TEXT,
    status: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
  }, {
    tableName: 'incident_histories',
  });

  IncidentHistory.associate = (models) => {
    IncidentHistory.belongsTo(models.Incident, {
      foreignKey: 'incidentId',
    });
    IncidentHistory.belongsTo(models.Organization, {
      foreignKey: 'createdBy',
    });
  };

  return IncidentHistory;
};
