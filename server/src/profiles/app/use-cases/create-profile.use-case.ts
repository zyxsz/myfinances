import { Profile } from '@/profiles/domain/entities/profile.entity';
import type { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ProfileOutputMapper,
  type ProfileOutput,
} from '../dtos/profile-output.dto';

export namespace CreateProfile {
  export interface Input {
    userId: string;
    name: string;
    document: string | null;
    type: Profile.ProfileType;
  }

  export interface Output extends ProfileOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private profilesRepository: ProfilesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const profile = Profile.Entity.create(input);

      await this.profilesRepository.insert(profile);

      return ProfileOutputMapper.toOutput(profile);
    }
  }
}
