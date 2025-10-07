import type { Release } from '@/releases/domain/entities/release.entity';
import type { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';

export class ReleasesInMemoryRepository
  extends InMemoryRepository<Release.Entity, Release.Props>
  implements ReleasesRepository {}
