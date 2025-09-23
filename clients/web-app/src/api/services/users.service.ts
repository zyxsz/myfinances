import { Api } from "..";
import type { UsersServiceInterfaces } from "../interfaces/http/users-service.interfaces";

export namespace UsersService {
  export const getAuthenticatedUser =
    async (): Promise<UsersServiceInterfaces.GetAuthenticatedUserResponse> => {
      return Api.request("users/me", "GET").then((response) => response.json());
    };
}
