import models from '../../models';
import pubsub from '../../utils/pubsub';
import { verifyToken } from '../../utils/auth';

const { Op } = models.Sequelize;

export default {
  Query: {
    incidents: async (parent, { status, labels }) => {
      // TODO: filter by keywords
      const where = {};
      if (status) { where.status = status; }
      if (labels) { where[Op.or] = labels.map((label) => ({ label })); }

      const incidents = await models.Incident.findAll({ where });
      return incidents;
    },
    incident: (parent, { id }) => models.Incident.findByPk(id),
    incidentLabels: () => models.IncidentLabel.findAll(),
  },

  Mutation: {
    createIncident: async (parent, { input }, { request }) => {
      const auth = verifyToken(request);
      const user = await models.User.findByPk(auth.id);
      if (!user) throw Error('User not found. Please re-login');

      const payload = {
        ...input,
        status: 'OPEN',
        createdBy: user.id,
      };

      const newIncident = await models.Incident.create(payload);

      pubsub.publish('NEW_INCIDENT', { newIncident });
      return newIncident;
    },
    addIncidentHistory: async (parent, { input }, { request }) => {
      const auth = verifyToken(request);
      const user = await models.User.findByPk(auth.id);
      if (!user) throw Error('User not found. Please re-login');

      const payload = {
        ...input,
        createdBy: user.id,
      };
      const newIncidentHistory = await models.IncidentHistory.create(payload);
      return newIncidentHistory;
    },
  },

  Subscription: {
    newIncident: {
      subscribe: () => pubsub.asyncIterator('NEW_INCIDENT'),
    },
  },

  Incident: {
    createdBy: (parent) => models.User.findByPk(parent.createdBy),
    label: (parent) => models.IncidentLabel.findByPk(parent.label),
    histories: (parent) => models.IncidentHistory.findAll({ where: { createdBy: parent.id } }),
    historiesCount: (parent) => models.IncidentHistory.count({ where: { createdBy: parent.id } }),
  },

  IncidentHistory: {
    createdBy: (parent) => models.User.findByPk(parent.createdBy),
  },
};
