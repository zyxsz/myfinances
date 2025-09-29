import type { Profile, ProfileType } from "../entities/profile.entity";

export type GetManyProfilesResponse = Profile[];

export type CreateProfileInput = {
  name: string;
  document: string | null;
  type: ProfileType;
};

export type CreateProfileOutput = Profile;

export type UpdateProfileInput = {
  name: string;
  document: string | null;
  type: ProfileType;
};
