import {
  registerUser,
  loginUser,
  refreshUsersSession,
  logoutUser,
} from '../db/services/auth.js';
import { registerUserSchema } from '../validation/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';

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

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

// refresh
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const refreshUserSessionController = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res.status(401).json({
        status: 401,
        message: 'No refresh token provided',
      });
    }

    const { accessToken, refreshToken } = await refreshUsersSession(
      oldRefreshToken,
    );

    res.cookie('refreshToken', refreshToken, {
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
    const { refreshToken } = req.cookies;
    const { sessionId } = req.body;

    await logoutUser(sessionId, refreshToken);

    res.clearCookie('refreshToken');

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
