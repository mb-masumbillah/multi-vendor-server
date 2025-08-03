/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../Error/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TVendorDetails } from '../vendor/vendor.interface';
import mongoose from 'mongoose';
import { Vendor } from '../vendor/vendor.medel';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = { ...payload };

  userData.role = 'user';

  const user = await User.isUserExsit(payload.email);

  if (user) {
    throw new AppError(StatusCodes.CONFLICT, 'User already exists');
  }

  const result = await User.create(userData);
  return result;
};

const createVendorIntoDB = async (payload: TVendorDetails, userInfo: TUser) => {
  const userData: Partial<TUser> = {};

  userData.name = userInfo?.name;
  userData.role = 'vendor';
  userData.email = userInfo?.email;
  userData.gender = userInfo?.gender;
  userData.number = userInfo?.number;

  
  const user = await User.isUserExsit(userInfo?.email);

  if (user) {
    throw new AppError(StatusCodes.CONFLICT, 'user already exists');
  }

  // session start ->
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'faild to create user');
    }

    payload.user = newUser[0]._id;

    // create a user (transaction-2)
    const newVendor = await Vendor.create([payload], { session });

    if (!newVendor) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Faild to create vendor');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
export const userService = {
  createUserIntoDB,
  createVendorIntoDB,
};
