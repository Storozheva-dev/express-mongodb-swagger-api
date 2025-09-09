import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
  logoutUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

// login
router.post(
  '/auth/login',

  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// refresh
router.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

// logout
router.post('/auth/logout', ctrlWrapper(logoutUserController));

// reset password
router.post(
  '/auth/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;

// "name":"Alina",
// "email":"pyvim1satidip4@10mail.xyz",
// "password":"12345"
