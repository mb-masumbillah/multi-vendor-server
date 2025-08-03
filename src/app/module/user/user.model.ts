import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { UserStatus } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    number: {
      type: String,
      required: true,
    },
    // profile_picture: {
    //   type: String,
    //   required: true,
    // },
    role: {
      type: String,
      enum: ['admin', 'user', 'vendor'],
    },
    status: {
      type: String,
      enum: [...UserStatus],
      default: 'in-progress',
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExsit = async function (email: string) {
  return await User.findOne({ email });
};

export const User = model<TUser, UserModel>('User', userSchema);
