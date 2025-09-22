import { hash, Sign } from 'crypto';
import { SignIn } from '../../sign-in.use-case';
import type { HashProvider } from '@/shared/app/providers/hash.provider';
import { UsersInMemoryRepository } from '@/users/infra/database/in-memory/users.in-memory.repository';
import { BcryptJsHashProvider } from '@/users/infra/providers/bcryptjs-hash.provider';
import { User } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user.data-builder';
import { InvalidPasswordError } from '@/shared/app/errors/invalid-password.error';

describe('SignIn use-case unit tests', () => {
  let sut: SignIn.UseCase;
  let hashProvider: HashProvider;
  let repository: UsersInMemoryRepository;

  beforeEach(() => {
    repository = new UsersInMemoryRepository();
    hashProvider = new BcryptJsHashProvider();
    sut = new SignIn.UseCase(repository, hashProvider);
  });

  it('should be able to sign-in', async () => {
    const email = 'test@admin.com';
    const password = 'password';

    const user = User.Entity.create(
      UserDataBuilder.build({
        email,
        password: await hashProvider.hash(password),
      }),
    );
    repository.items[0] = user;

    const response = sut.execute({ email: 'test@admin.com', password });

    await expect(response).resolves.not.toThrow();
    expect(response).resolves.toBeDefined();
    expect((await response).id).toEqual(user.id);
  });

  it('should throw while trying to sign-in with a invalid password', async () => {
    const email = 'test@admin.com';
    const password = 'password';

    const user = User.Entity.create(
      UserDataBuilder.build({
        email,
        password: await hashProvider.hash(password),
      }),
    );
    repository.items[0] = user;

    const response = sut.execute({
      email: 'test@admin.com',
      password: 'wrongPassword',
    });

    expect(response).rejects.toThrow(InvalidPasswordError);
  });
});
