import type { Release } from "@/releases/domain/entities/release.entity";
import type { ReleasePeriod } from "../dtos/release-period";
import { BaseUseCase } from "@/shared/app/use-cases/base.use-case";
import { ReleasesRepository } from "@/releases/domain/repositories/releases.repository";

export namespace GetReleasesValue {
  export interface Input {
    profileId: string;
    period: ReleasePeriod;
    type: Release.Type

  }

  export interface Output {
    totalValueInCents: number;
  }

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super()
    }

    async execute(input: Input): Promise<Output> {
      const releases = await this.releasesRepository.findManyByProfileIdAndPeriodAndType(input.profileId, input.period || 30, input.type)

      const totalValueInCents = releases.reduce((a, b) => a + b.valueInCents, 0)

      return {
        totalValueInCents
      }
    }
  }
}