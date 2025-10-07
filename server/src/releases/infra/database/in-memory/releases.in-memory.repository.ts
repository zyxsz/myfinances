import type { Release } from '@/releases/domain/entities/release.entity';
import type { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';
import { addDays, isAfter, isBefore } from 'date-fns';

export class ReleasesInMemoryRepository
  extends InMemoryRepository<Release.Entity, Release.Props>
  implements ReleasesRepository
{
  async findRecentByProfileIdWithPeriod(
    profileId: string,
    limit: number,
    periodInDays?: number,
  ): Promise<Release.Entity[]> {
    const items = this.items
      .filter((item) => item.profileId === profileId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (periodInDays)
      return items
        .filter((item) =>
          isAfter(item.createdAt, addDays(new Date(), periodInDays * -1)),
        )
        .slice(0, limit);

    return items.slice(0, limit);
  }
}
