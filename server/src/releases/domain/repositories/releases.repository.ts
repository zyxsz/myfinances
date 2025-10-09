import { Repository } from '@/shared/domain/repositories/repository';
import type { Release } from '../entities/release.entity';
import type { Pagination } from '@/shared/domain/pagination/pagination';

export abstract class ReleasesRepository extends Repository<
  Release.Entity,
  Release.Props
> {
  abstract findRecentByProfileIdWithPeriod(
    profileId: string,
    limit: number,
    periodInDays?: number,
  ): Promise<Release.Entity[]>;

  abstract findManyByProfileIdWithPagination(
    profileId: string,
    pagination: Pagination.Input,
  ): Promise<Pagination.Output<Release.Entity>>;
}
