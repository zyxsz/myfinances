import type { User } from "../entities/user.entity";

export namespace UsersServiceInterfaces {
  export type GetAuthenticatedUserResponse = User;

  // SignIn
  export interface SignInInput {
    email: string;
    password: string;
  }

  export interface SignInOutput {
    accessToken: string;
  }

  // SignUp
  export interface SignUpInput {
    email: string;
    nickname: string | null;
    firstName: string;
    lastName: string;
    password: string;
  }

  export interface SignUpOutput {
    accessToken: string;
  }
}
