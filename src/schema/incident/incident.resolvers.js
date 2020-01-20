import models from '../../models';
import pubsub from '../../utils/pubsub';
import { verifyToken } from '../../utils/auth';
import db from '../../db';

const { Op } = models.Sequelize;

export default {
  Query: {
    incidents: async (parent, { status, labels }) => ({ status, labels }),
    incident: async (parent, { id }) => {
      const incident = await models.Incident.findByPk(id);
      if (!incident) throw Error('incident not found');

      return incident;
    },
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
        images: JSON.stringify(input.images),
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
        images: JSON.stringify(input.images),
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

  IncidentConnection: {
    nodes: async ({ status, labels }) => {
      const where = {};
      if (status) { where.status = status; }
      if (labels) { where[Op.or] = labels.map((label) => ({ label })); }

      const incidents = await models.Incident.findAll({ where });
      return incidents;
    },

    totalCount: async ({ status, labels }) => {
      const where = {};
      if (status) { where.status = status; }
      if (labels) { where[Op.or] = labels.map((label) => ({ label })); }

      const incidents = await models.Incident.count({ where });
      return incidents;
    },

    stats: async ({ status, labels }, { groupBy }) => {
      const query = db
        .select(db.raw('COUNT(id) as count'), db.raw(`${groupBy} as fieldGroup`))
        .from('incidents');

      if (status) query.where({ status });
      if (labels) query.whereIn('label', labels);
      query.groupByRaw(groupBy);

      const result = await query;
      return result;
    },
  },

  Incident: {
    createdBy: (parent) => models.User.findByPk(parent.createdBy),
    label: (parent) => models.IncidentLabel.findByPk(parent.label),
    histories: (parent) => models.IncidentHistory.findAll({ where: { incidentId: parent.id } }),
    historiesCount: (parent) => models.IncidentHistory.count({ where: { incidentId: parent.id } }),
    images: (parent) => JSON.parse(parent.images),
  },

  IncidentHistory: {
    createdBy: (parent) => models.User.findByPk(parent.createdBy),
    images: (parent) => JSON.parse(parent.images),

  },

  IncidentLabel: {
    relatedOrganizations: async (parent) => {
      const include = [
        { model: models.Organization },
      ];
      const incidentLabel = await models.IncidentLabel.findByPk(parent.id, { include });
      return incidentLabel.Organizations;
    },
    incidents: (parent, { status }) => ({ status, labels: [parent.id] }),
  },
};
