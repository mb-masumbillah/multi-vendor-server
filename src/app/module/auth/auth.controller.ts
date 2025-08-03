import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { authSerivces } from './auth.service';

const createToken = catchAsynch(async (req, res) => {

  const result = await authSerivces.createTokenIntoService(req.body);

  const accessToken = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'token created successfull',
    data: accessToken,
  });
});

export const authController = {
  createToken,
};
