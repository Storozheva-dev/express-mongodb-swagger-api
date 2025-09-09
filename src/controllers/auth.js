import {
  registerUser,
  loginUser,
  refreshUsersSession,
  logoutUser,
  requestResetToken,
  resetPassword,
} from '../db/services/auth.js';

import { registerUserSchema } from '../validation/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';

// register
export const registerUserController = async (req, res, next) => {
  try {
    const { error, value } = registerUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: 400,
        message: 'Validation error',
        data: error.details.map((d) => d.message),
      });
    }

    const user = await registerUser(value);

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// login
export const loginUserController = async (req, res, next) => {
  try {
    const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', session.sessionId.toString(), {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAYS),
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

// refresh
export const refreshUserSessionController = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({
        status: 401,
        message: 'No refresh token provided',
      });
    }

    const { accessToken, refreshToken, sessionId } = await refreshUsersSession(
      oldRefreshToken,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', sessionId.toString(), {
      httpOnly: true,
      expires: new Date(Date.now() + THIRTY_DAYS),
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

// logout
export const logoutUserController = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
      await logoutUser(sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// reset token
export const requestResetEmailController = async (req, res, next) => {
  try {
    await requestResetToken(req.body.email);
    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// reset password
export const resetPasswordController = async (req, res, next) => {
  try {
    await resetPassword(req.body);
    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
