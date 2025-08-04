import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userService.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Create Successfull',
    data: result,
  });
});

const createVendor = catchAsync(async (req, res) => {
  const { vendorDetails, ...userInfo } = req.body;

  const result = await userService.createVendorIntoDB(vendorDetails, userInfo);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'vendor create successfull',
    success: true,
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUserIntoDB();

  sendResponse(res, {
    success: true,
    message: 'get all user success',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { role, userEmail } = req.user;

  const result = await userService.getMeIntoDB(userEmail, role);
  sendResponse(res, {
    success: true,
    message: 'single user get successfull',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const userController = {
  createUser,
  createVendor,
  getMe,
  getAllUser,
};
