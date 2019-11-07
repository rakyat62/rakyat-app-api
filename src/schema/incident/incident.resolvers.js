import { Incident } from '../../models';
import pubsub from '../../utils/pubsub';

export default {
  Query: {
    incidents: async () => {
      const incidents = await Incident.find();
      return incidents;
    },
  },
  Mutation: {
    createIncident: async (parent, { data }) => {
      const incident = await Incident.create(data);
      pubsub.publish('NEW_INCIDENT', { newIncident: incident });
      return incident;
    },
  },
  Subscription: {
    newIncident: {
      subscribe: () => pubsub.asyncIterator('NEW_INCIDENT'),
    },
  },
};
