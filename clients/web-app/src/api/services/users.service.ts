import { Api } from "..";
import type { UsersServiceInterfaces } from "../interfaces/http/users-service.interfaces";

export namespace UsersService {
  export const getAuthenticatedUser =
    async (): Promise<UsersServiceInterfaces.GetAuthenticatedUserResponse> => {
      return Api.request("users/me", "GET").then((response) => response.json());
    };

  export const signIn = async (
    data: UsersServiceInterfaces.SignInInput
  ): Promise<UsersServiceInterfaces.SignInOutput> => {
    return Api.request("users/signin", "POST", {
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  export const signUp = async (
    data: UsersServiceInterfaces.SignUpInput
  ): Promise<UsersServiceInterfaces.SignUpOutput> => {
    return Api.request("users/signup", "POST", {
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };
}
