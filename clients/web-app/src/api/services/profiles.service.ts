import { Api } from "..";
import type {
  CreateProfileInput,
  CreateProfileOutput,
  GetManyProfilesResponse,
  GetProfileOutput,
  UpdateProfileInput,
} from "../interfaces/http/profiles-service.interface";

export namespace ProfilesService {
  export const getProfile = async (id: string): Promise<GetProfileOutput> => {
    return Api.request(`profiles/${id}`, "GET").then((response) =>
      response.json()
    );
  };

  export const getManyProfiles = async (): Promise<GetManyProfilesResponse> => {
    return Api.request("profiles", "GET").then((response) => response.json());
  };

  export const createProfile = async (
    data: CreateProfileInput
  ): Promise<CreateProfileOutput> => {
    return await Api.request(`profiles`, "POST", {
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  export const updateProfile = async (
    id: string,
    data: UpdateProfileInput
  ): Promise<void> => {
    await Api.request(`profiles/${id}`, "PATCH", {
      body: JSON.stringify(data),
    });

    return;
  };
}
