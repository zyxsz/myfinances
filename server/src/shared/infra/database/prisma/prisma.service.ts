import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

}