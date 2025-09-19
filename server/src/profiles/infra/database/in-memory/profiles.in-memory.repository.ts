import type { Profile } from '@/profiles/domain/entities/profile.entity';
import type { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';

export class ProfilesInMemoryRepository
  extends InMemoryRepository<Profile.Entity, Profile.Props>
  implements ProfilesRepository {}
