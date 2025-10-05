import { User } from '@/users/domain/entities/user.entity';
import type { usersModel } from '../models/users.model';
import type { InferSchemaType } from 'mongoose';

export class UsersMongoDBMapper {
  static toEntity(document: InferSchemaType<typeof usersModel>) {
    return User.Entity.create(
      {
        email: document.email,
        firstName: document.firstName,
        lastName: document.lastName,
        nickname: document.nickname,
        password: document.password,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
      document._id,
    );
  }

  static toJSON(entity: User.Entity) {
    return {
      _id: entity.id,
      email: entity.email,
      nickname: entity.nickname,
      firstName: entity.firstName,
      lastName: entity.lastName,
      password: entity.password,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
