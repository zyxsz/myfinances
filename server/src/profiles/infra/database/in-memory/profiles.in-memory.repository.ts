import type { Profile } from '@/profiles/domain/entities/profile.entity';
import type { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';

export class ProfilesInMemoryRepository
  extends InMemoryRepository<Profile.Entity, Profile.Props>
  implements ProfilesRepository
{
  async findByIdAndUserId(id: string, userId: string): Promise<Profile.Entity> {
    const profile = this.items.find((i) => i.id === id && i.userId === userId);

    if (!profile) throw new NotFoundError('Profile not found');

    return profile;
  }
}
