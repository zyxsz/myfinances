import type { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';

export namespace DeleteProfile {
  export interface Input {
    profileId: string;
  }

  export type Output = void;

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private profilesRepository: ProfilesRepository) {
      super();
    }

    async execute(input: Input): Promise<void> {
      const profile = await this.profilesRepository.findById(input.profileId);

      await this.profilesRepository.delete(profile);
    }
  }
}
