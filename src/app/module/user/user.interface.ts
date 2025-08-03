import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  number: string;
  profile_picture?: string;
  role:  'user' | 'admin' | 'vendor' ;
  status: 'in-progress' | 'blocked';
  gender: 'male' | 'female' | 'others';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExsit(email: string): Promise<TUser | null>;
}

export type TUserRole = keyof typeof USER_ROLE;
