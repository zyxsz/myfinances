import { User } from '@/users/domain/entities/user.entity';
import { UsersInMemoryRepository } from '../../users.in-memory.repository';
import type { UsersRepository } from '../../users.repository';

describe('Users in-memory repository unit tests', () => {
  let sut: UsersRepository;

  beforeEach(() => {
    sut = new UsersInMemoryRepository();
  });

  it('should be able to find a user by email', async () => {
    const userProps = {
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Topzera',
      password: 'dasdadsa',
      nickname: null,
    };

    const entity = User.Entity.create(userProps);

    await sut.insert(entity);

    const result = await sut.findByEmail(userProps.email);

    expect(result).toBeDefined();
    expect(result.email).toEqual(userProps.email);
  });
});
