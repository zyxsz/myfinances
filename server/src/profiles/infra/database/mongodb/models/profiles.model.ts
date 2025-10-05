import type { ProfileSchema } from '@/profiles/domain/validators/profile.validator';
import { Schema } from 'mongoose';

export type ProfileModelType = ProfileSchema & {
  _id: string;
  updatedAt: Date;
  createdAt: Date;
};

export const profilesModel = new Schema<ProfileModelType>(
  {
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    document: { type: String, required: false, default: null },
    type: { type: String, required: true },
    userId: {
      type: String,
      ref: 'users',
    },
  },
  { _id: false, timestamps: true },
);
