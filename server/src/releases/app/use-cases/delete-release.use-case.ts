import { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';

export namespace DeleteRelease {
  export interface Input {
    releaseId: string;
    profileId: string;
  }

  export type Output = void;

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const release = await this.releasesRepository.findByIdAndProfileId(input.releaseId, input.profileId);

      await this.releasesRepository.delete(release);

      return;
    }
  }
}
