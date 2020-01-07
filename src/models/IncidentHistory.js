module.exports = (sequelize, DataTypes) => {
  const IncidentHistory = sequelize.define('IncidentHistory', {
    content: DataTypes.TEXT,
    type: DataTypes.STRING,
  }, {
    tableName: 'incident_histories',
  });

  IncidentHistory.associate = (models) => {
    IncidentHistory.belongsTo(models.Incident, {
      foreignKey: 'incidentId',
    });
    IncidentHistory.belongsTo(models.User, {
      foreignKey: 'createdBy',
    });
  };

  return IncidentHistory;
};
