module.exports = (sequelize, DataTypes) => {
  const IncidentComment = sequelize.define('IncidentComment', {
    content: DataTypes.TEXT,
  }, {
    tableName: 'incident_comments',
  });

  IncidentComment.associate = (models) => {
    IncidentComment.belongsTo(models.Incident);
    IncidentComment.belongsTo(models.User);
  };

  return IncidentComment;
};
