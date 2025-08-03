/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../app/Error/AppError';
import { TUserRole } from '../app/module/user/user.interface';
import catchAsynch from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
import { User } from '../app/module/user/user.model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsynch(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.FORBIDDEN, 'you are not Authorized');
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
    }

    const { role, userEmail, iat } = decoded;

    const user = await User.isUserExsit(userEmail);

    if (!user) {
      throw new AppError(StatusCodes.CONFLICT, 'User not found');
    }

    if (user?.isDeleted) {
      throw new AppError(StatusCodes.GONE, 'user has deleted');
    }

    if (user?.status === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'user is blocked');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
