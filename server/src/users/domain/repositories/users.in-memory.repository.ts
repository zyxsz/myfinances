import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';
import type { UsersRepository } from './users.repository';
import type { User } from '../entities/user.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';

export class UsersInMemoryRepository
  extends InMemoryRepository<User.Entity, User.Props>
  implements UsersRepository
{
  async findByEmail(email: string): Promise<User.Entity> {
    const item = this.items.find((e) => e.email === email);

    if (!item) throw new NotFoundError('User not found by email');

    return item;
  }
}
