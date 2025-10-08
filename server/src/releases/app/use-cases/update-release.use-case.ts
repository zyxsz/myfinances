import { Release } from '@/releases/domain/entities/release.entity';
import { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ReleaseOutputMapper,
  type ReleaseOutput,
} from '../dtos/release-output.dto';

export namespace UpdateRelease {
  export interface Input {
    releaseId: string;

    data: {
      name?: string;
      description?: string | null;

      valueInCents?: number;
      type?: Release.Type;

      madeAt?: Date | null;
    };
  }

  export interface Output extends ReleaseOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const release = await this.releasesRepository.findById(input.releaseId);

      if (input.data.name !== undefined) release.name = input.data.name;
      if (input.data.description !== undefined)
        release.description = input.data.description;
      if (input.data.valueInCents !== undefined)
        release.valueInCents = input.data.valueInCents;
      if (input.data.type !== undefined) release.type = input.data.type;
      if (input.data.madeAt !== undefined) release.madeAt = input.data.madeAt;

      await this.releasesRepository.update(release);

      return ReleaseOutputMapper.toOutput(release);
    }
  }
}
