import models from '../../models';

export default {
  Query: {
    user: async (parent, { id, username }) => {
      let user;

      const include = [
        { model: models.Organization },
      ];

      if (id) {
        user = await models.User.findByPk(id, { include });
      } else if (username) {
        user = await models.User.findOne({ where: { username }, include });
      }
      user.organizations = user.Organizations.map((org) => ({
        ...org.toJSON(),
        role: org.UserRole.role,
      }));

      return user;
    },
  },

  Mutation: {
    createUser: (parent, { input }) => models.User.create(input),
  },

  User: {
  },
};
