import type { UsersRepository } from '@/users/domain/repositories/users.repository';
import { GetUser } from '../../get-user.use-case';
import { UsersInMemoryRepository } from '@/users/infra/database/in-memory/users.in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';
import { User } from '@/users/domain/entities/user.entity';
import { UserOutputMapper } from '@/users/app/dtos/user-output.dto';

describe('Get user use-case unit tests', () => {
  let sut: GetUser.UseCase;
  let repository: UsersInMemoryRepository;

  beforeEach(() => {
    repository = new UsersInMemoryRepository();
    sut = new GetUser.UseCase(repository);
  });

  it('should throw while trying to get a non existing user', () => {
    expect(() => sut.execute({ id: 'fake id' })).rejects.toThrow(NotFoundError);
  });

  it('should be able to get user data', async () => {
    const entity = User.Entity.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'TopZera',
      password: 'DasDadSa',
      nickname: null,
    });

    repository.items[0] = entity;

    const response = await sut.execute({ id: entity.id });

    expect(response).toBeDefined();
    expect(response).toStrictEqual(UserOutputMapper.toOutput(entity));
  });
});
