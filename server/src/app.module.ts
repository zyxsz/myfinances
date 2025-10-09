import { Module } from '@nestjs/common';
import { UsersModule } from './users/infra/users.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { ConfigModule } from './shared/infra/config/config.module';
import { ProfilesModule } from './profiles/infra/profiles.module';
import { MongooseModule } from './shared/infra/database/mongoose/mongoose.module';
import { PrismaModule } from './shared/infra/database/prisma/prisma.module';
import { ReleasesModule } from './releases/infra/releases.module';

@Module({
  imports: [ConfigModule, PrismaModule, MongooseModule, UsersModule, ProfilesModule, ReleasesModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule { }
