import { NotFoundError } from "@/shared/domain/errors/not-found.error";
import { PrismaService } from "@/shared/infra/database/prisma/prisma.service";
import type { User } from "@/users/domain/entities/user.entity";
import { UsersRepository } from "@/users/domain/repositories/users.repository";
import { UsersPrismaMapper } from "./mappers/users.prisma.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {
  }

  async findById(id: string): Promise<User.Entity> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundError('User not found');

    return UsersPrismaMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<User.Entity> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) throw new NotFoundError('User not found');

    return UsersPrismaMapper.toEntity(user);
  }

  async insert(entity: User.Entity): Promise<void> {
    await this.prismaService.user.create({
      data: UsersPrismaMapper.toPrisma(entity),
    });
  }

  async update(entity: User.Entity): Promise<void> {
    await this.prismaService.user.update({
      where: { id: entity.id },
      data: UsersPrismaMapper.toPrisma(entity),
    });
  }

  async delete(entity: User.Entity): Promise<void> {
    await this.prismaService.user.delete({
      where: { id: entity.id },
    });
  }
}