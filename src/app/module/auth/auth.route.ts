import express from 'express';
import { authController } from './auth.controller';
import validationRequest from '../../../middleware/validationRequest';
import { createUserTokenValidation } from './auth.zod';

const router = express.Router();

router.post(
  '/',
  validationRequest(createUserTokenValidation),
  authController.createToken,
);

export const AuthRoute = router;
