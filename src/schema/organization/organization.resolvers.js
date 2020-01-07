import models from '../../models';
import { verifyToken } from '../../utils/auth';

export default {
  Query: {
    organizations: async () => models.Organization.findAll(),
    organization: async (parent, { id }) => models.Organization.findByPk(id),
  },
  Mutation: {
    createOrganization: async (parent, { input }, { request }) => {
      const auth = verifyToken(request);
      const user = await models.User.findByPk(auth.id);
      if (!user) throw Error('user not found');
      const org = await models.Organization.create(input);
      await user.addOrganization(org, { through: { role: 'OWNER' } });
      return org;
    },
    addOrganizationMember: async (parent, { organizationId, username, role = 'MEMBER' }) => {
      const getUser = models.User.findOne({ where: { username } });
      const getOrganization = models.Organization.findByPk(organizationId);
      const [user, organization] = await Promise.all([getUser, getOrganization]);
      if (!user) throw Error('user not found');
      if (!organization) throw Error('organization not found');
      const isAlreadyMember = await user.hasOrganization(organizationId);
      if (isAlreadyMember) throw Error('user already the member');
      await user.addOrganization(organizationId, { through: { role } });
      return organization;
    },
    addOrganizationRelatedLabel: async (parent, { incidentLabelId, organizationId }) => {
      const getIncidentLabel = models.IncidentLabel.findByPk(incidentLabelId);
      const getOrganization = models.Organization.findByPk(organizationId);
      const [incidentLabel, organization] = await Promise.all([getIncidentLabel, getOrganization]);
      if (!incidentLabel) throw Error('user not found');
      if (!organization) throw Error('organization not found');

      const isAlreadyAdded = await organization.hasIncidentLabel(incidentLabelId);
      if (isAlreadyAdded) throw Error('Label already added');

      await organization.addIncidentLabel(incidentLabel);
      return organization;
    },
  },
  Organization: {
    members: async (parent) => {
      const include = [
        { model: models.User },
      ];
      const org = await models.Organization.findByPk(parent.id, { include });
      return org.Users.map((user) => ({
        ...user.toJSON(),
        role: user.UserRole.role,
      }));
    },
    relatedLabels: async (parent) => {
      const include = [
        { model: models.IncidentLabel },
      ];
      const org = await models.Organization.findByPk(parent.id, { include });
      return org.IncidentLabels;
    },
  },
};
