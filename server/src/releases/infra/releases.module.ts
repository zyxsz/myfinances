import { PrismaModule } from "@/shared/infra/database/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { ReleasesRepository } from "../domain/repositories/releases.repository";
import { ReleasesPrismaRepository } from "./database/prisma/releases.prisma.repository";
import { CreateRelease } from "../app/use-cases/create-release.use-case";
import { DeleteRelease } from "../app/use-cases/delete-release.use-case";
import { GetRecentRelease } from "../app/use-cases/get-recent-releases.use-case";
import { GetRelease } from "../app/use-cases/get-release.use-case";
import { GetReleasesWithPagination } from "../app/use-cases/get-releases-with-pagination.use-case";
import { UpdateRelease } from "../app/use-cases/update-release.use-case";

import { ProfilesRepository } from "@/profiles/domain/repositories/profiles.repository";
import { ProfilesPrismaRepository } from "@/profiles/infra/database/prisma/profiles.prisma.repository";
import { GetProfile } from "@/profiles/app/use-cases/get-profile.use-case";
import { ReleasesController } from "./releases.controller";
import { AuthModule } from "@/auth/infra/auth.module";
import { GetReleasesValue } from "../app/use-cases/get-releases-value.use-case";
import { GetLastReleases } from "../app/use-cases/get-last-releases.use-case";

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ReleasesController],
  providers: [{ provide: ReleasesRepository, useClass: ReleasesPrismaRepository },
  { provide: ProfilesRepository, useClass: ProfilesPrismaRepository },
  {
    provide: GetProfile.UseCase,
    useFactory: (repository: ProfilesRepository) => {
      return new GetProfile.UseCase(repository);
    },
    inject: [ProfilesRepository],
  },
  {
    provide: CreateRelease.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new CreateRelease.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  {
    provide: DeleteRelease.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new DeleteRelease.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  {
    provide: GetRecentRelease.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new GetRecentRelease.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  {
    provide: GetRelease.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new GetRelease.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  {
    provide: GetReleasesWithPagination.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new GetReleasesWithPagination.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  {
    provide: UpdateRelease.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new UpdateRelease.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  {
    provide: GetReleasesValue.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new GetReleasesValue.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  {
    provide: GetLastReleases.UseCase,
    useFactory: (repository: ReleasesRepository) => {
      return new GetLastReleases.UseCase(repository);
    },
    inject: [ReleasesRepository],
  },
  ],
})
export class ReleasesModule { }