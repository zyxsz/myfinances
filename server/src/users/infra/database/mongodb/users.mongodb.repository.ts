import { MongooseService } from '@/shared/infra/database/mongoose/mongoose.service';

import { usersModel, type UserModelType } from './models/users.model';
import { UsersRepository } from '@/users/domain/repositories/users.repository';
import { User } from '@/users/domain/entities/user.entity';
import { Model } from 'mongoose';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import { UsersMongoDBMapper } from './mappers/users.mongodb.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersMongoDBRepository implements UsersRepository {
  private model: Model<UserModelType>;

  constructor(private mongooseService: MongooseService) {
    this.model = this.mongooseService.connectModel('users', usersModel);
  }

  async findById(id: string): Promise<User.Entity> {
    const user = await this.model.findById(id);

    if (!user) throw new NotFoundError('User not found');

    return UsersMongoDBMapper.toEntity(user.toJSON());
  }

  async findByEmail(email: string): Promise<User.Entity> {
    const user = await this.model.findOne({ email: email });

    if (!user) throw new NotFoundError('User not found');

    return UsersMongoDBMapper.toEntity(user.toJSON());
  }

  async insert(entity: User.Entity): Promise<void> {
    const j = UsersMongoDBMapper.toJSON(entity);

    console.log(j);

    await this.model.create(UsersMongoDBMapper.toJSON(entity));
  }

  async update(entity: User.Entity): Promise<void> {
    await this.model.updateOne(
      { id: entity.id },
      UsersMongoDBMapper.toJSON(entity),
    );
  }

  async delete(entity: User.Entity): Promise<void> {
    await this.model.deleteOne({ id: entity.id });
  }
}
