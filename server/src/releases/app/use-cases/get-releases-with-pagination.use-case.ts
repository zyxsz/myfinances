import { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ReleaseOutputMapper,
  type ReleaseOutput,
} from '../dtos/release-output.dto';
import type { Pagination } from '@/shared/domain/pagination/pagination';

export namespace GetReleasesWithPagination {
  export interface Input extends Pagination.Input {
    profileId: string;
  }

  export interface Output extends Pagination.Output<ReleaseOutput> { }

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const releases =
        await this.releasesRepository.findManyByProfileIdWithPagination(
          input.profileId,
          { page: input.page, limitPerPage: input.limitPerPage }
        );

      return {
        pagination: releases.pagination,
        data: releases.data.map((release) => ReleaseOutputMapper.toOutput(release)),
      }
    }
  }
}
