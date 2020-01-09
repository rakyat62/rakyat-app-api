import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const verifyToken = (request) => {
  const header = request.request.headers.authorization;
  if (!header) throw Error('Authentication required');

  const [authType, token] = header.split(' ');
  if (authType !== 'Bearer') throw Error('unkwown auth type');

  const jwtPayload = jwt.verify(token, JWT_SECRET);
  return jwtPayload;
};
