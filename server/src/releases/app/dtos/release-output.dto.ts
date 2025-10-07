import type { Release } from '@/releases/domain/entities/release.entity';
import type { User } from '@/users/domain/entities/user.entity';

export interface ReleaseOutput {
  id: string;
  profileId: string;

  name: string;
  description: string | null;

  valueInCents: number;
  type: Release.Type;

  madeAt: Date | null;

  updatedAt: Date;
  createdAt: Date;
}

export class ReleaseOutputMapper {
  static toOutput(release: Release.Entity): ReleaseOutput {
    return {
      id: release.id,
      profileId: release.profileId,
      name: release.name,
      description: release.description,
      valueInCents: release.valueInCents,
      type: release.type,
      madeAt: release.madeAt,
      updatedAt: release.updatedAt,
      createdAt: release.createdAt,
    };
  }
}
