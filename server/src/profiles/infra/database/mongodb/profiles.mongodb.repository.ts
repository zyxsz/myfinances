import { ProfilesRepository } from '@/profiles/domain/repositories/profiles.repository';
import { MongooseService } from '@/shared/infra/database/mongoose/mongoose.service';
import { Injectable } from '@nestjs/common';
import type { Model } from 'mongoose';
import { profilesModel, type ProfileModelType } from './models/profiles.model';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import { ProfilesMongoDBMapper } from './mappers/profiles.mongodb.mapper';
import type { Profile } from '@/profiles/domain/entities/profile.entity';

@Injectable()
export class ProfilesMongoDBRepository implements ProfilesRepository {
  private model: Model<ProfileModelType>;

  constructor(private mongooseService: MongooseService) {
    this.model = this.mongooseService.connectModel('profiles', profilesModel);
  }

  async findById(id: string): Promise<Profile.Entity> {
    const profile = await this.model.findById(id);

    if (!profile) throw new NotFoundError('Profile not found');

    return ProfilesMongoDBMapper.toEntity(profile);
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Profile.Entity> {
    const profile = await this.model.findOne({ _id: id, userId });

    if (!profile) throw new NotFoundError('Profile not found');

    return ProfilesMongoDBMapper.toEntity(profile);
  }

  async findManyByUserId(userId: string): Promise<Profile.Entity[]> {
    const profiles = await this.model.find({ userId });

    return profiles.map((profile) => ProfilesMongoDBMapper.toEntity(profile));
  }

  async insert(entity: Profile.Entity): Promise<void> {
    await this.model.create(ProfilesMongoDBMapper.toJSON(entity));
  }

  async update(entity: Profile.Entity): Promise<void> {
    await this.model.updateOne(
      { _id: entity.id },
      ProfilesMongoDBMapper.toJSON(entity),
    );
  }

  async delete(entity: Profile.Entity): Promise<void> {
    await this.model.deleteOne({ _id: entity.id });
  }
}
