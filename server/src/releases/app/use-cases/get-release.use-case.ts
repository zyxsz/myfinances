import { Release } from '@/releases/domain/entities/release.entity';
import { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ReleaseOutputMapper,
  type ReleaseOutput,
} from '../dtos/release-output.dto';

export namespace GetRelease {
  export interface Input {
    releaseId: string;
    profileId: string
  }

  export interface Output extends ReleaseOutput { }

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const release = await this.releasesRepository.findByIdAndProfileId(input.releaseId, input.profileId);

      return ReleaseOutputMapper.toOutput(release);
    }
  }
}
