import type { InferSchemaType } from 'mongoose';
import type { profilesModel } from '../models/profiles.model';
import { Profile } from '@/profiles/domain/entities/profile.entity';

export class ProfilesMongoDBMapper {
  static toEntity(document: InferSchemaType<typeof profilesModel>) {
    return Profile.Entity.create(
      {
        userId: document.userId,
        name: document.name,
        document: document.document,
        type: document.type as Profile.ProfileType,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
      document._id,
    );
  }

  static toJSON(entity: Profile.Entity) {
    return {
      _id: entity.id,
      userId: entity.userId,
      name: entity.name,
      document: entity.document,
      type: entity.type,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
