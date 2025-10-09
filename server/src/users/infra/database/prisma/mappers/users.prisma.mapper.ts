import { User } from "@/users/domain/entities/user.entity";
import type { User as PrismaUser, Prisma } from "generated/prisma/client";


export class UsersPrismaMapper {
  static toEntity(user: PrismaUser) {
    return User.Entity.create(
      {
        nickname: user.nickname,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id
    );
  }

  static toPrisma(user: User.Entity): Prisma.UserCreateInput {
    return {
      id: user.id,
      nickname: user.nickname,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}