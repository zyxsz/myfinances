import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ProfileOutputMapper,
  type ProfileOutput,
} from '../dtos/profile-output.dto';
import type { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';

export namespace GetProfile {
  export interface Input {
    profileId: string;
  }

  export interface Output extends ProfileOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private profilesRepository: ProfilesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const profile = await this.profilesRepository.findById(input.profileId);

      return ProfileOutputMapper.toOutput(profile);
    }
  }
}
