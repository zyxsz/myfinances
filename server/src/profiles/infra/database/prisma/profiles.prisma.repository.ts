import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { PrismaService } from "@/shared/infra/database/prisma/prisma.service";
import { ProfilesPrismaMapper } from "./mappers/profiles.prisma.mapper";
import { Injectable } from "@nestjs/common";
import type { ProfilesRepository } from "@/profiles/domain/repositories/profiles.repository";
import type { Profile } from "@/profiles/domain/entities/profile.entity";

@Injectable()
export class ProfilesPrismaRepository implements ProfilesRepository {
  constructor(private prismaService: PrismaService) {
  }

  async findById(id: string): Promise<Profile.Entity> {
    const profile = await this.prismaService.profile.findUnique({
      where: { id }
    })

    if (!profile) throw new NotFoundError('Profile not found')

    return ProfilesPrismaMapper.toEntity(profile)
  }

  async findManyByUserId(userId: string): Promise<Profile.Entity[]> {
    const profiles = await this.prismaService.profile.findMany({ where: { userId } })

    return profiles.map(profile => ProfilesPrismaMapper.toEntity(profile))
  }


  async findByIdAndUserId(id: string, userId: string): Promise<Profile.Entity> {
    const profile = await this.prismaService.profile.findUnique({ where: { id, userId } })

    if (!profile) throw new NotFoundError('Profile not found')

    return ProfilesPrismaMapper.toEntity(profile)
  }

  async insert(entity: Profile.Entity): Promise<void> {
    await this.prismaService.profile.create({
      data: ProfilesPrismaMapper.toPrisma(entity)
    })
  }

  async update(entity: Profile.Entity): Promise<void> {
    await this.prismaService.profile.update({
      where: { id: entity.id },
      data: ProfilesPrismaMapper.toPrisma(entity)
    })
  }

  async delete(entity: Profile.Entity): Promise<void> {
    await this.prismaService.profile.delete({
      where: { id: entity.id }
    })
  }

}