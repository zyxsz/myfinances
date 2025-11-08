import { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ReleaseOutputMapper,
  type ReleaseOutput,
} from '../dtos/release-output.dto';
import type { ReleasePeriodRange } from '../dtos/release-period';

export namespace GetLastReleases {
  export interface Input extends ReleasePeriodRange {
    profileId: string;
  }

  export interface Output extends Array<ReleaseOutput> { }

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const releases =
        await this.releasesRepository.findLastByProfileIdAndRange(
          input.profileId,
          15,
          input.range.startAt, input.range.endAt
        );

      return releases.map((release) => ReleaseOutputMapper.toOutput(release));
    }
  }
}
