import { Repository } from '@/shared/domain/repositories/repository';
import type { Release } from '../entities/release.entity';

export abstract class ReleasesRepository extends Repository<
  Release.Entity,
  Release.Props
> {}
