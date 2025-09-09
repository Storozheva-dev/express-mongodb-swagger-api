import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UserCollection } from '../models/User.js';
import {
  FIFTEEN_MINUTES,
  THIRTY_DAYS,
  SMTP,
  JWT,
  APP,
  TEMPLATES_DIR,
} from '../../constants/index.js';
import { randomBytes } from 'crypto';
import { SessionCollection } from '../models/Session.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

// register
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

// login
export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  // сбрасываем старую сессию
  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('hex');
  const refreshToken = randomBytes(30).toString('hex');

  const session = await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return { accessToken, refreshToken, sessionId: session._id };
};

// refresh
export const refreshUsersSession = async (refreshToken) => {
  const session = await SessionCollection.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({ _id: session._id });

  const accessToken = randomBytes(30).toString('hex');
  const newRefreshToken = randomBytes(30).toString('hex');

  const newSession = await SessionCollection.create({
    userId: session.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
    sessionId: newSession._id,
  };
};

// logout
export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

// request reset
export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetToken = jwt.sign({ sub: user._id, email }, JWT.SECRET, {
    expiresIn: '5m',
  });
  const appDomain = (APP.DOMAIN || '').replace(/\/$/, '');
  const resetLink = `${appDomain}/reset-password?token=${encodeURIComponent(
    resetToken,
  )}`;

  const templatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');
  const source = await fs.readFile(templatePath, 'utf-8');
  const html = handlebars.compile(source)({
    name: user.name || 'there',
    link: resetLink,
    year: new Date().getFullYear(),
  });

  try {
    await sendEmail({
      from: SMTP.FROM,
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }

  return resetToken;
};

// reset password
export const resetPassword = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, JWT.SECRET);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await UserCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  await UserCollection.updateOne(
    { _id: user._id },
    { $set: { password: encryptedPassword } },
  );
  await SessionCollection.deleteMany({ userId: user._id });
};
