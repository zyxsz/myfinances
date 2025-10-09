import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateRelease } from "../app/use-cases/create-release.use-case";
import { DeleteRelease } from "../app/use-cases/delete-release.use-case";
import { GetRecentRelease } from "../app/use-cases/get-recent-releases.use-case";
import { GetRelease } from "../app/use-cases/get-release.use-case";
import { GetReleasesWithPagination } from "../app/use-cases/get-releases-with-pagination.use-case";
import { UpdateRelease } from "../app/use-cases/update-release.use-case";
import { AuthenticatedRoute } from "@/auth/infra/decorators/authenticated-route.decorator";
import { AuthenticatedUser } from "@/auth/infra/decorators/authenticated-user.decorator";
import { GetProfile } from "@/profiles/app/use-cases/get-profile.use-case";
import { PeriodDto } from "./dtos/period.dto";
import { CreateReleaseDto } from "./dtos/create-release.dto";
import { GetReleasesWithPaginationDto } from "./dtos/get-releases-with-pagination.dto";
import { UpdateReleaseDto } from "./dtos/update-release.dto";
import { GetReleasesValue } from "../app/use-cases/get-releases-value.use-case";
import { GetReleasesTotalDto } from "./dtos/get-releases-total.dto";


@Controller('/profiles/:profileId/releases')
@AuthenticatedRoute()
export class ReleasesController {
  @Inject()
  private createReleaseUseCase: CreateRelease.UseCase;
  @Inject()
  private deleteReleaseUseCase: DeleteRelease.UseCase
  @Inject()
  private getRecentReleasesUseCase: GetRecentRelease.UseCase
  @Inject()
  private getReleaseUseCase: GetRelease.UseCase
  @Inject()
  private getReleasesWithPaginationUseCase: GetReleasesWithPagination.UseCase
  @Inject()
  private updateReleaseUseCase: UpdateRelease.UseCase
  @Inject()
  private getReleasesTotalUseCase: GetReleasesValue.UseCase
  @Inject()
  private getProfileUseCase: GetProfile.UseCase



  @Get('/recents')
  @HttpCode(200)
  async getRecentReleases(@Query() query: PeriodDto, @Param('profileId') profileId: string, @AuthenticatedUser() userId: string) {
    const profile = await this.getProfileUseCase.execute({ profileId, userId })
    const releases = await this.getRecentReleasesUseCase.execute({ profileId: profile.id, period: query.period })

    return releases
  }

  @Get('/total')
  @HttpCode(200)
  async getReleasesTotal(@Query() query: GetReleasesTotalDto, @Param('profileId') profileId: string, @AuthenticatedUser() userId: string) {
    const profile = await this.getProfileUseCase.execute({ profileId, userId })
    const response = await this.getReleasesTotalUseCase.execute({ profileId: profile.id, type: query.type, period: query.period })

    return response
  }

  @Get('/:releaseId')
  @HttpCode(200)
  async getRelease(@Param('profileId') profileId: string, @Param('releaseId') releaseId: string, @AuthenticatedUser() userId: string) {
    const profile = await this.getProfileUseCase.execute({ profileId, userId })
    const release = await this.getReleaseUseCase.execute({ releaseId, profileId: profile.id })


    return release
  }


  @Get('/')
  @HttpCode(200)
  async getReleasesWithPagination(@Query() query: GetReleasesWithPaginationDto, @Param('profileId') profileId: string, @Param('releaseId') releaseId: string, @AuthenticatedUser() userId: string) {

    const profile = await this.getProfileUseCase.execute({ profileId, userId })
    const releases = await this.getReleasesWithPaginationUseCase.execute({ profileId: profile.id, page: query.page, limitPerPage: query.limit })

    return releases
  }


  @Post('/')
  @HttpCode(201)
  async createRelease(@Param('profileId') profileId: string, @AuthenticatedUser() userId: string, @Body() body: CreateReleaseDto) {
    const profile = await this.getProfileUseCase.execute({ profileId, userId })
    const release = await this.createReleaseUseCase.execute({ profileId: profile.id, name: body.name, description: body.description, valueInCents: body.valueInCents, type: body.type, madeAt: body.madeAt })

    return release
  }


  @Patch('/:releaseId')
  @HttpCode(200)
  async updateRelease(@Body() body: UpdateReleaseDto, @Param('profileId') profileId: string, @Param('releaseId') releaseId: string, @AuthenticatedUser() userId: string) {
    const profile = await this.getProfileUseCase.execute({ profileId, userId })

    const release = await this.updateReleaseUseCase.execute({
      releaseId, profileId: profile.id, data: {
        name: body.name,
        description: body.description,
        valueInCents: body.valueInCents,
        type: body.type,
        madeAt: body.madeAt
      }
    })

    return release
  }

  @Delete('/:releaseId')
  @HttpCode(204)
  async deleteRelease(@Param('profileId') profileId: string, @Param('releaseId') releaseId: string, @AuthenticatedUser() userId: string) {
    const profile = await this.getProfileUseCase.execute({ profileId, userId })

    await this.deleteReleaseUseCase.execute({ releaseId, profileId: profile.id })

    return
  }
}