import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const userData  = req.body;

  const result = await userService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Create Successfull',
    data: result,
  });
});

const createVendor = catchAsync(async (req, res) => {

  const { vendorDetails, ...userInfo} = req.body

  const result = await userService.createVendorIntoDB( vendorDetails, userInfo);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'vendor create successfull',
    success: true,
    data: result,
  });
});

export const userController = {
  createUser,
  createVendor,
};
