import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export interface ITokenPayload {
  userId: string;
  role: string;
  email: string;
}

export const generateTokens = (payload: ITokenPayload) => {
  const accessToken = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN
  } as jwt.SignOptions);

  const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN
  } as jwt.SignOptions);

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): ITokenPayload => {
  return jwt.verify(token, ENV.JWT_SECRET) as ITokenPayload;
};

export const verifyRefreshToken = (token: string): ITokenPayload => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as ITokenPayload;
};
