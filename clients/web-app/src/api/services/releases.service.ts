import { Api } from "..";
import type { ReleasePeriod, ReleaseType } from "../interfaces/entities/release.entity";
import type { CreateReleaseInput, CreateReleaseResponse, DeleteReleaseResponse, GetLastReleasesResponse, GetRecentReleasesResponse, GetReleaseResponse, GetReleasesTotalResponse, GetReleasesWithPaginationResponse, UpdateReleaseInput, UpdateReleaseResponse } from "../interfaces/http/releases-service.interface";

export namespace ReleasesService {
  export const getRecentReleases = async (profileId: string): Promise<GetRecentReleasesResponse> => {
    return Api.request(`profiles/${profileId}/releases/recent`, "GET", { cache: 'no-store' }).then((response) =>
      response.json()
    );
  };
  export const getLastReleases = async (profileId: string, rangeStart: Date, rangeEnd: Date): Promise<GetLastReleasesResponse> => {
    const params = new URLSearchParams()
    params.append('rangeStartAt', rangeStart.toISOString())
    params.append('rangeEndAt', rangeEnd.toISOString())

    return Api.request(`profiles/${profileId}/releases/last?${params.toString()}`, "GET", { cache: 'no-store' }).then((response) =>
      response.json()
    );
  };
  export const getRelease = async (profileId: string, releaseId: string): Promise<GetReleaseResponse> => {
    return Api.request(`profiles/${profileId}/releases/${releaseId}`, "GET", { cache: 'no-store' }).then((response) =>
      response.json()
    );
  };
  export const getReleasesWithPagination = async (profileId: string, page: number, limit: number): Promise<GetReleasesWithPaginationResponse> => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    return Api.request(`profiles/${profileId}/releases?${params.toString()}`, "GET", { cache: 'no-store' }).then((response) =>
      response.json()
    );
  };

  export const getReleasesTotal = async (profileId: string, rangeStart: Date, rangeEnd: Date, type: ReleaseType): Promise<GetReleasesTotalResponse> => {
    const params = new URLSearchParams()
    params.append('type', type)
    params.append('rangeStartAt', rangeStart.toISOString())
    params.append('rangeEndAt', rangeEnd.toISOString())

    return Api.request(`profiles/${profileId}/releases/total?${params.toString()}`, "GET", { cache: 'no-store' }).then((response) =>
      response.json()
    );
  };


  export const createRelease = async (
    profileId: string,
    data: CreateReleaseInput
  ): Promise<CreateReleaseResponse> => {
    return await Api.request(`profiles/${profileId}/releases`, "POST", {
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  export const updateRelease = async (
    profileId: string,
    id: string,
    data: UpdateReleaseInput
  ): Promise<UpdateReleaseResponse> => {

    return await Api.request(`profiles/${profileId}/releases/${id}`, "PATCH", {
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  export const deleteRelease = async (
    profileId: string,
    id: string,
  ): Promise<DeleteReleaseResponse> => {
    await Api.request(`profiles/${profileId}/releases/${id}`, "DELETE");

    return;
  };
}
