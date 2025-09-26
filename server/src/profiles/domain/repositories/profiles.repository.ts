import { Repository } from '@/shared/domain/repositories/repository';
import type { Profile } from '../entities/profile.entity';

export abstract class ProfilesRepository extends Repository<
  Profile.Entity,
  Profile.Props
> {
  abstract findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Profile.Entity>;

  abstract findManyByUserId(userId: string): Promise<Profile.Entity[]>;
}
