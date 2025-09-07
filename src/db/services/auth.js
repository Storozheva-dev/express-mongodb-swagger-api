import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserCollection } from '../models/User.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../../constants/index.js';
import { randomBytes } from 'crypto';
import { SessionCollection } from '../models/Session.js';

export const registerUser = async ({ name, email, password }) => {
  const exists = await UserCollection.findOne({ email });
  if (exists) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const created = await UserCollection.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _pw, ...safeUser } = created.toObject();
  return safeUser;
};
//  логін юзер
export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('hex');
  const refreshToken = randomBytes(30).toString('hex');

  await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { accessToken, refreshToken };
};

// решреф

export const refreshUsersSession = async (refreshToken) => {
  const session = await SessionCollection.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({ _id: session._id });

  const accessToken = randomBytes(30).toString('hex');
  const newRefreshToken = randomBytes(30).toString('hex');

  await SessionCollection.create({
    userId: session.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { accessToken, refreshToken: newRefreshToken };
};

// логаут
export const logoutUser = async (token) => {
  const { deletedCount } = await SessionCollection.deleteOne({
    $or: [{ accessToken: token }, { refreshToken: token }],
  });
  return deletedCount;
};
