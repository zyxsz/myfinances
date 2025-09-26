import { AuthenticatedRoute } from '@/auth/infra/decorators/authenticated-route.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetManyProfiles } from '../app/use-cases/get-many-profiles.use-case';
import { AuthenticatedUser } from '@/auth/infra/decorators/authenticated-user.decorator';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { CreateProfile } from '../app/use-cases/create-profile.use-case';
import { GetProfile } from '../app/use-cases/get-profile.use-case';
import { DeleteProfile } from '../app/use-cases/delete-profile.use-case';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateProfile } from '../app/use-cases/update-profile.use-case';

@Controller('/profiles')
@AuthenticatedRoute()
export class ProfilesController {
  @Inject()
  private getManyProfilesUseCase: GetManyProfiles.UseCase;

  @Inject()
  private createProfileUseCase: CreateProfile.UseCase;

  @Inject()
  private getProfileUseCase: GetProfile.UseCase;

  @Inject()
  private updateProfileUseCase: UpdateProfile.UseCase;

  @Inject()
  private deleteProfileUseCase: DeleteProfile.UseCase;

  @Get('/')
  @HttpCode(200)
  async getManyProfiles(@AuthenticatedUser() userId: string) {
    const profiles = await this.getManyProfilesUseCase.execute({ userId });

    return profiles;
  }

  @Get('/:profileId')
  @HttpCode(200)
  async getProfile(
    @AuthenticatedUser() userId: string,
    @Param('profileId') profileId: string,
  ) {
    const profile = await this.getProfileUseCase.execute({ userId, profileId });

    return profile;
  }

  @Post('/')
  @HttpCode(201)
  async createProfile(
    @AuthenticatedUser() userId: string,
    @Body() body: CreateProfileDto,
  ) {
    const profile = await this.createProfileUseCase.execute({
      ...body,
      userId,
    });

    return profile;
  }

  @Patch('/:profileId')
  @HttpCode(200)
  async updateProfile(
    @AuthenticatedUser() userId: string,
    @Param('profileId') profileId: string,
    @Body() body: UpdateProfileDto,
  ) {
    const profile = await this.updateProfileUseCase.execute({
      userId,
      profileId,
      ...body,
    });

    return profile;
  }

  @Delete('/:profileId')
  @HttpCode(200)
  async deleteProfile(
    @AuthenticatedUser() userId: string,
    @Param('profileId') profileId: string,
  ) {
    const profile = await this.getProfileUseCase.execute({ userId, profileId });

    await this.deleteProfileUseCase.execute({ profileId: profile.id });

    return;
  }
}
