import type { UsersRepository } from '@/users/domain/repositories/users.repository';
import { CreateUser } from '../../create-user.use-case';
import { UsersInMemoryRepository } from '@/users/infra/database/in-memory/users.in-memory.repository';
import type { HashProvider } from '@/shared/app/providers/hash.provider';
import { BcryptJsHashProvider } from '@/users/infra/providers/bcryptjs-hash.provider';
import { User } from '@/users/domain/entities/user.entity';
import { ConflictError } from '@/shared/app/errors/conflict.error';

describe('Create user use case unit tests', () => {
  let sut: CreateUser.UseCase;
  let repository: UsersRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    hashProvider = new BcryptJsHashProvider();
    repository = new UsersInMemoryRepository();
    sut = new CreateUser.UseCase(repository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const insertSpyOn = jest.spyOn(repository, 'insert');

    const props = {
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Topzera',
      password: 'dasdadsa',
      nickname: null,
    };

    const result = await sut.execute(props);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(insertSpyOn).toHaveBeenCalledTimes(1);
  });

  it('should throw while trying to create a user with a conflicted email', async () => {
    const props = {
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Topzera',
      password: 'dasdadsa',
      nickname: null,
    };

    await repository.insert(User.Entity.create(props));

    expect(async () => await sut.execute(props)).rejects.toThrow(ConflictError);
  });
});
