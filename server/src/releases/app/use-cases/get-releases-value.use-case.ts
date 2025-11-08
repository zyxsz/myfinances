import type { Release } from "@/releases/domain/entities/release.entity";
import type { ReleasePeriod, ReleasePeriodRange } from "../dtos/release-period";
import { BaseUseCase } from "@/shared/app/use-cases/base.use-case";
import { ReleasesRepository } from "@/releases/domain/repositories/releases.repository";
import type { PeriodDetails } from "../dtos/release-period-details";

export namespace GetReleasesValue {
  export interface Input extends ReleasePeriodRange {
    profileId: string;
    type: Release.Type

  }

  export interface Output extends PeriodDetails {
    totalValueInCents: number;

  }

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private releasesRepository: ReleasesRepository) {
      super()
    }

    async execute(input: Input): Promise<Output> {
      const releases = await this.releasesRepository.findManyByProfileIdAndRangeAndType(input.profileId, input.range.startAt, input.range.endAt, input.type)

      const totalValueInCents = releases.reduce((a, b) => a + b.valueInCents, 0)

      return {
        totalValueInCents,
        periodDetails: {
          startAt: input.range.startAt,
          endAt: input.range.endAt,
        }
      }
    }
  }
}