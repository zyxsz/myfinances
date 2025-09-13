import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';

import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import type { User } from '@/users/domain/entities/user.entity';
import type { UsersRepository } from '@/users/domain/repositories/users.repository';

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
