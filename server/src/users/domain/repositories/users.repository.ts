import { Repository } from '@/shared/domain/repositories/repository';
import type { User } from '../entities/user.entity';

export abstract class UsersRepository extends Repository<
  User.Entity,
  User.Props
> {
  abstract findByEmail(email: string): Promise<User.Entity>;
}
