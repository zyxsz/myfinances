import type { Release } from "@/releases/domain/entities/release.entity";
import { ReleasesRepository } from "@/releases/domain/repositories/releases.repository";
import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { PrismaService } from "@/shared/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ReleasesPrismaMapper } from "./mappers/releases.prisma.mapper";
import { addDays } from "date-fns";
import type { Pagination } from "@/shared/domain/pagination/pagination";

@Injectable()
export class ReleasesPrismaRepository implements ReleasesRepository {
  constructor(private prismaService: PrismaService) { }

  async findById(id: string): Promise<Release.Entity> {
    const release = await this.prismaService.release.findUnique({ where: { id } })

    if (!release) throw new NotFoundError('Release not found')

    return ReleasesPrismaMapper.toEntity(release)
  }

  async findByIdAndProfileId(id: string, profileId: string): Promise<Release.Entity> {
    const release = await this.prismaService.release.findUnique({ where: { id, profileId } })

    if (!release) throw new NotFoundError('Release not found')

    return ReleasesPrismaMapper.toEntity(release)
  }

  async findRecentByProfileIdWithPeriod(profileId: string, limit: number, periodInDays?: number): Promise<Release.Entity[]> {
    const releases = await this.prismaService.release.findMany({ where: periodInDays ? { profileId, createdAt: { gte: addDays(new Date(), periodInDays * -1) } } : { profileId }, take: limit, orderBy: { createdAt: 'desc' } })

    return releases.map(release => ReleasesPrismaMapper.toEntity(release))
  }

  async findManyByProfileIdWithPagination(profileId: string, pagination: Pagination.Input): Promise<Pagination.Output<Release.Entity>> {
    const skip = (pagination.page - 1) * pagination.limitPerPage

    console.log(skip)

    const count = await this.prismaService.release.count({ where: { profileId } })
    const releases = await this.prismaService.release.findMany({
      where: { profileId },
      skip,
      take: pagination.limitPerPage,
      orderBy: { createdAt: 'desc' }
    })

    const totalPages = Math.ceil(count / pagination.limitPerPage);

    return {
      data: releases.map(release => ReleasesPrismaMapper.toEntity(release)),
      pagination: {
        currentPage: pagination.page,
        limitPerPage: pagination.limitPerPage,
        totalCount: count,
        totalPages: totalPages
      }
    }
  }

  async insert(entity: Release.Entity): Promise<void> {
    await this.prismaService.release.create({
      data: ReleasesPrismaMapper.toPrismaCreate(entity)
    })
  }

  async update(entity: Release.Entity): Promise<void> {
    await this.prismaService.release.update({
      where: { id: entity.id },
      data: ReleasesPrismaMapper.toPrismaUpdate(entity)
    })
  }

  async delete(entity: Release.Entity): Promise<void> {
    await this.prismaService.release.delete({
      where: { id: entity.id }
    })
  }
}