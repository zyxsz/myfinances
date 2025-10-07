import { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ReleaseOutputMapper,
  type ReleaseOutput,
} from '../dtos/release-output.dto';
import type { ReleasePeriod } from '../dtos/release-period';

export namespace GetRecentRelease {
  export interface Input {
    profileId: string;

    period: ReleasePeriod;
  }

  export interface Output extends Array<ReleaseOutput> {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const releases =
        await this.releasesRepository.findRecentByProfileIdWithPeriod(
          input.profileId,
          15,
          input.period,
        );

      return releases.map((release) => ReleaseOutputMapper.toOutput(release));
    }
  }
}
