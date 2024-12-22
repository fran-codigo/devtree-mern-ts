import jwt, { JwtPayload } from 'jsonwebtoken';

export const generatJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  return token;
};
