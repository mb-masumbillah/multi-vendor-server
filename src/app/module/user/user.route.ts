import { Router } from 'express';
import { userController } from './user.controller';
import validationRequest from '../../../middleware/validationRequest';
import { userValidationSchema } from './user.zod';
import { vendorDetailsValidationSchema } from '../vendor/vendor.zod';
import auth from '../../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/create-user',
  validationRequest(userValidationSchema),
  userController.createUser,
);
router.post(
  '/create-vendor',
  validationRequest(vendorDetailsValidationSchema),
  userController.createVendor,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.vendor),
  userController.getAllUser,
);
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.vendor),
  userController.getMe,
);

export const UserRoute = router;
