import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../../models';
import { verifyToken } from '../../utils/auth';

const { JWT_SECRET } = process.env;

export default {
  Query: {
    user: async (parent, { id, username }) => {
      let user;

      if (id) {
        user = await models.User.findByPk(id);
      } else if (username) {
        user = await models.User.findOne({ where: { username } });
      }

      return user;
    },

    me: async (parent, args, { request }) => {
      const auth = verifyToken(request);
      const user = await models.User.findByPk(auth.id);
      if (!user) throw Error('user not found');
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
    organizations: async (parent) => {
      const include = [
        { model: models.Organization },
      ];

      const user = await models.User.findByPk(parent.id, { include });
      return user.Organizations.map((org) => ({
        ...org.toJSON(),
        role: org.UserRole.role,
      }));
    },
  },
};
