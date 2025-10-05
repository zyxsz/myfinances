import type { UserSchema } from '@/users/domain/validators/user.validator';
import { Schema } from 'mongoose';

export type UserModelType = UserSchema & {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
};

export const usersModel = new Schema<UserModelType>(
  {
    _id: { type: String, required: true, unique: true },
    nickname: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { _id: false, timestamps: true },
);
