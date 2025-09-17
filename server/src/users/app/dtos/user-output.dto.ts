import type { User } from '@/users/domain/entities/user.entity';

export interface UserOutput {
  id: string;
  email: string;
  nickname: string | null;
  firstName: string;
  lastName: string;
  updatedAt: Date;
  createdAt: Date;
}

export class UserOutputMapper {
  static toOutput(user: User.Entity): UserOutput {
    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  }
}
