import graphqlFields from 'graphql-fields';
import models from '../../models';
import { verifyToken } from '../../utils/auth';

export default {
  Query: {
    organizations: async (parent, args, ctx, info) => {
      let nodes;
      let totalCount;
      const fields = graphqlFields(info);

      if (fields.nodes) {
        const include = [
          { model: models.User },
        ];

        nodes = await models.Organization.findAll({ include });
        nodes = nodes.map((org) => ({
          ...org.toJSON(),
          members: org.Users.map((user) => ({
            ...user.toJSON(),
            role: user.UserRole.role,
          })),
        }));
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
      return user;
    },
  },
};
