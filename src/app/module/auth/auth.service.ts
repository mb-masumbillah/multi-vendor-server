import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../Error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import jwt from 'jsonwebtoken';

const createTokenIntoService = async (payload: TLoginUser) => {
  const user = await User.isUserExsit(payload?.email);
 
  console.log({user})

  if (!user) {
    throw new AppError(StatusCodes.CONFLICT, 'User not Found');
  }
 if (user?.isDeleted) {
    throw new AppError(StatusCodes.GONE, 'This user account has been deleted');
  }

  if (user?.status === 'blocked') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Your account is blocked. Please contact support.',
    );
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: 60 * 60,
  });

  return {
    accessToken,
  };
};

export const authSerivces = {
  createTokenIntoService,
};
