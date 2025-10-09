
import { Profile } from "@/profiles/domain/entities/profile.entity";
import type { Profile as PrismaProfile, Prisma } from "generated/prisma/client";


export class ProfilesPrismaMapper {
  static toEntity(entity: PrismaProfile) {
    return Profile.Entity.create(
      {
        document: entity.document,
        name: entity.name,
        type: entity.type,
        userId: entity.userId,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,

      },
      entity.id
    );
  }

  static toPrisma(entity: Profile.Entity): PrismaProfile {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      createdAt: entity.createdAt,
      document: entity.document,
      updatedAt: entity.updatedAt,
      userId: entity.userId,

    };
  }
}