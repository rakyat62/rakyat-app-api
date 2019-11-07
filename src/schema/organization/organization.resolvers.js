import graphqlFields from 'graphql-fields';
import models from '../../models';

export default {
  Query: {
    organizations: async (parent, args, ctx, info) => {
      let nodes;
      let totalCount;
      const fields = graphqlFields(info);

      if (fields.nodes) {
        nodes = await models.Organization.findAll();
      }
      if (fields.totalCount) {
        totalCount = await models.Organization.count();
      }

      return {
        nodes,
        totalCount,
      };
    },
  },
  Mutation: {
    createOrganization: async (parent, { login, input }) => {
      const user = await models.User.findOne({ where: { username: login } });
      if (!user) throw Error('user not found');
      const org = await models.Organization.create(input);
      await user.addOrganization(org, { through: { role: 'OWNER' } });
      return org;
    },
    addOrganizationMember: async (parent, { organizationId, username }) => {
      const getUser = models.User.findOne({ where: { username } });
      const getOrganization = models.Organization.findByPk(organizationId);
      const [user, organization] = await Promise.all([getUser, getOrganization]);
      if (!organization) throw Error('organization not found');
      const isAlreadyMember = await user.hasOrganization(organizationId);
      if (isAlreadyMember) throw Error('user already the member');
      await user.addOrganization(organizationId, { through: { role: 'MEMBER' } });
      return user;
    },
  },
};
