import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ProfileOutputMapper,
  type ProfileOutput,
} from '../dtos/profile-output.dto';
import type { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';

export namespace GetManyProfiles {
  export interface Input {
    userId: string;
  }

  export interface Output extends Array<ProfileOutput> {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private profilesRepository: ProfilesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const profiles = await this.profilesRepository.findManyByUserId(
        input.userId,
      );

      return profiles.map((profile) => ProfileOutputMapper.toOutput(profile));
    }
  }
}
