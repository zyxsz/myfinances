import type { Release } from '@/releases/domain/entities/release.entity';
import type { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import type { Pagination } from '@/shared/domain/pagination/pagination';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';
import { addDays, isAfter, } from 'date-fns';

export class ReleasesInMemoryRepository
  extends InMemoryRepository<Release.Entity, Release.Props>
  implements ReleasesRepository {

  async findByIdAndProfileId(id: string, profileId: string): Promise<Release.Entity> {
    const item = this.items.find(item => item.id === id && item.profileId === profileId)

    if (!item) throw new NotFoundError('Profile not found')

    return item
  }

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

  async findManyByProfileIdWithPagination(profileId: string, pagination: Pagination.Input): Promise<Pagination.Output<Release.Entity>> {
    const items = this.items
      .filter((item) => item.profileId === profileId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return {
      pagination: {
        currentPage: pagination.page,
        limitPerPage: pagination.limitPerPage,
        totalPages: Math.ceil(items.length / pagination.limitPerPage),
        totalCount: items.length,
      },
      data: items.slice((pagination.page - 1) * pagination.limitPerPage, pagination.page * pagination.limitPerPage),
    }
  }
}
