
import { Release } from "@/releases/domain/entities/release.entity";
import type { Release as PrismaRelease, Prisma } from "generated/prisma/client";


export class ReleasesPrismaMapper {
  static toEntity(entity: PrismaRelease) {
    return Release.Entity.create(
      {
        description: entity.description,
        madeAt: entity.madeAt,
        name: entity.name,
        profileId: entity.profileId,
        type: entity.type,
        valueInCents: entity.valueInCents,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,

      },
      entity.id
    );
  }

  static toPrismaCreate(entity: Release.Entity): PrismaRelease {
    return {
      id: entity.id,
      profileId: entity.profileId,
      name: entity.name,
      type: entity.type,
      description: entity.description,
      madeAt: entity.madeAt,
      valueInCents: entity.valueInCents,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,

    };
  }

  static toPrismaUpdate(entity: Release.Entity): Prisma.ReleaseUpdateInput {
    return {

      name: entity.name,
      type: entity.type,
      description: entity.description,
      madeAt: entity.madeAt,
      valueInCents: entity.valueInCents,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,

    };
  }
}