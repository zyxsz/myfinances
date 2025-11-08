import type { PaginationResult } from "../dto/pagination";
import type { Release } from "../entities/release.entity";


export type GetRecentReleasesResponse = Release[]
export type GetLastReleasesResponse = Release[]
export type GetReleaseResponse = Release
export type GetReleasesWithPaginationResponse = PaginationResult<Release>
export type GetReleasesTotalResponse = {
  "totalValueInCents": number,
  "periodDetails": {
    "startAt": string
    "endAt": string
  }
}

export type CreateReleaseInput = Pick<Release, 'name' | 'description' | 'valueInCents' | 'type' | 'madeAt'>
export type CreateReleaseResponse = Release

export type UpdateReleaseInput = Partial<CreateReleaseInput>
export type UpdateReleaseResponse = Release

export type DeleteReleaseResponse = void