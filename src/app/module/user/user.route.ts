import { Router } from 'express';
import { userController } from './user.controller';
import validationRequest from '../../../middleware/validationRequest';
import { userValidationSchema } from './user.zod';
import { vendorDetailsValidationSchema } from '../vendor/vendor.zod';

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

export const UserRoute = router;
