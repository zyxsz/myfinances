import { Release } from '@/releases/domain/entities/release.entity';
import { ReleasesRepository } from '@/releases/domain/repositories/releases.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ReleaseOutputMapper,
  type ReleaseOutput,
} from '../dtos/release-output.dto';

export namespace CreateRelease {
  export interface Input {
    profileId: string;

    name: string;
    description: string | null;

    valueInCents: number;
    type: Release.Type;

    madeAt: Date | null;
  }

  export interface Output extends ReleaseOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const release = Release.Entity.create({
        profileId: input.profileId,
        name: input.name,
        description: input.description,
        valueInCents: input.valueInCents,
        type: input.type,
        madeAt: input.madeAt,
      });

      await this.releasesRepository.insert(release);

      return ReleaseOutputMapper.toOutput(release);
    }
  }
}
