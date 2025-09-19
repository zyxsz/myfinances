import type { Profile } from '@/profiles/domain/entities/profile.entity';

export interface ProfileOutput {
  id: string;
  userId: string;
  name: string;
  document: string | null;
  type: Profile.ProfileType;
  updatedAt: Date;
  createdAt: Date;
}

export class ProfileOutputMapper {
  static toOutput(profile: Profile.Entity): ProfileOutput {
    return {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      document: profile.document,
      type: profile.type,
      updatedAt: profile.updatedAt,
      createdAt: profile.createdAt,
    };
  }
}
