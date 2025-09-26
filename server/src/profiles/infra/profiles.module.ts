import { AuthModule } from '@/auth/infra/auth.module';
import { Module } from '@nestjs/common';
import { ProfilesRepository } from '../domain/repositories/profiles.repository';
import { ProfilesInMemoryRepository } from './database/in-memory/profiles.in-memory.repository';
import { GetManyProfiles } from '../app/use-cases/get-many-profiles.use-case';
import { ProfilesController } from './profiles.controller';
import { CreateProfile } from '../app/use-cases/create-profile.use-case';
import { GetProfile } from '../app/use-cases/get-profile.use-case';
import { UpdateProfile } from '../app/use-cases/update-profile.use-case';
import { DeleteProfile } from '../app/use-cases/delete-profile.use-case';

@Module({
  imports: [AuthModule],
  providers: [
    { provide: ProfilesRepository, useClass: ProfilesInMemoryRepository },
    {
      provide: GetManyProfiles.UseCase,
      useFactory: (repository: ProfilesRepository) => {
        return new GetManyProfiles.UseCase(repository);
      },
      inject: [ProfilesRepository],
    },
    {
      provide: CreateProfile.UseCase,
      useFactory: (repository: ProfilesRepository) => {
        return new CreateProfile.UseCase(repository);
      },
      inject: [ProfilesRepository],
    },
    {
      provide: GetProfile.UseCase,
      useFactory: (repository: ProfilesRepository) => {
        return new GetProfile.UseCase(repository);
      },
      inject: [ProfilesRepository],
    },
    {
      provide: UpdateProfile.UseCase,
      useFactory: (repository: ProfilesRepository) => {
        return new UpdateProfile.UseCase(repository);
      },
      inject: [ProfilesRepository],
    },
    {
      provide: DeleteProfile.UseCase,
      useFactory: (repository: ProfilesRepository) => {
        return new DeleteProfile.UseCase(repository);
      },
      inject: [ProfilesRepository],
    },
  ],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
