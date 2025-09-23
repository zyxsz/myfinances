import type { User } from "../entities/user.entity";

export namespace UsersServiceInterfaces {
  export type GetAuthenticatedUserResponse = User;
}
