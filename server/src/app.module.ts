import { Module } from '@nestjs/common';
import { UsersModule } from './users/infra/users.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { ConfigModule } from './shared/infra/config/config.module';
import { ProfilesModule } from './profiles/infra/profiles.module';
import { MongooseModule } from './shared/infra/database/mongoose/mongoose.module';

@Module({
  imports: [ConfigModule, MongooseModule, UsersModule, ProfilesModule],
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
export class AppModule {}
