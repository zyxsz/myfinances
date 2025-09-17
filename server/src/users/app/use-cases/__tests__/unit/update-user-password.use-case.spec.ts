import { UsersInMemoryRepository } from '@/users/infra/database/in-memory/users.in-memory.repository';
import { UpdateUserPassword } from '../../update-user-password.use-case';
import { BcryptJsHashProvider } from '@/users/infra/providers/bcryptjs-hash.provider';
import type { HashProvider } from '@/shared/app/providers/hash.provider';
import { User } from '@/users/domain/entities/user.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';

describe('Update user password use-case unit tests', () => {
  let sut: UpdateUserPassword.UseCase;
  let usersRepository: UsersInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    hashProvider = new BcryptJsHashProvider();
    usersRepository = new UsersInMemoryRepository();
    sut = new UpdateUserPassword.UseCase(usersRepository, hashProvider);
  });

  it("should be able to update user's password", async () => {
    const entity = User.Entity.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'TopZera',
      password: 'DasDadSa',
      nickname: null,
    });

    const newPassword = 'newPassword';

    usersRepository.items[0] = entity;

    await expect(() =>
      sut.execute({ id: entity.id, password: newPassword }),
    ).resolves.not.toThrow();
    expect(usersRepository.items[0].password).not.toEqual('DasDadSa');
  });

  it('should throw while trying to update a invalid user', async () => {
    const entity = User.Entity.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'TopZera',
      password: 'DasDadSa',
      nickname: null,
    });

    const newPassword = 'newPassword';

    usersRepository.items[0] = entity;

    await expect(() =>
      sut.execute({ id: 'nf', password: newPassword }),
    ).rejects.toThrow(NotFoundError);
  });
});
