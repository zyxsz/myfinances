import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import {
  ProfileOutputMapper,
  type ProfileOutput,
} from '../dtos/profile-output.dto';
import type { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';
import type { Profile } from '@/profiles/domain/entities/profile.entity';

export namespace UpdateProfile {
  export interface Input {
    profileId: string;
    userId: string;

    name?: string;
    document?: string | null;
    type?: Profile.ProfileType;
  }

  export interface Output extends ProfileOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private profilesRepository: ProfilesRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const profile = await this.profilesRepository.findByIdAndUserId(
        input.profileId,
        input.userId,
      );

      if (input.name) profile.name = input.name;
      if (input.type) profile.type = input.type;
      if (input.document !== undefined) profile.document = input.document;

      await this.profilesRepository.update(profile);

      return ProfileOutputMapper.toOutput(profile);
    }
  }
}
