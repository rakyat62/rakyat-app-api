import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../../models';

const { JWT_SECRET } = process.env;

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
    createUser: async (parent, { input }) => {
      const password = await bcrypt.hash(input.password, 10);
      return models.User.create({ ...input, password });
    },
    login: async (parent, { input }) => {
      const { username, password } = input;
      const user = await models.User.findOne({ where: { username } });
      if (!user) throw Error('user not found');

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw Error('wrong password');

      const token = jwt.sign({ id: user.id }, JWT_SECRET);

      return { token, user };
    },
  },

  User: {
  },
};
