import { UpdateUser } from '../../update-user.use-case';
import { UsersInMemoryRepository } from '@/users/infra/database/in-memory/users.in-memory.repository';
import { User } from '@/users/domain/entities/user.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found.error';

describe('Update user use-case unit tests', () => {
  let sut: UpdateUser.UseCase;
  let usersRepository: UsersInMemoryRepository;

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    sut = new UpdateUser.UseCase(usersRepository);
  });

  it("should be able to update a user's nickname", async () => {
    const entity = User.Entity.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Topzera',
      password: 'dasdadsa',
      nickname: null,
    });

    const newNickname = 'blabla';

    usersRepository.items[0] = entity;

    const response = await sut.execute({
      id: entity.id,
      data: {
        nickname: newNickname,
      },
    });

    expect(response).toBeDefined();
    expect(response.id).toEqual(entity.id);
    expect(response.nickname).toEqual(newNickname);
    expect(usersRepository.items[0].nickname).toEqual(newNickname);
  });

  it("should be able to update a user's firstName", async () => {
    const entity = User.Entity.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Topzera',
      password: 'dasdadsa',
      nickname: null,
    });

    const newFirstName = 'blablaname';

    usersRepository.items[0] = entity;

    const response = await sut.execute({
      id: entity.id,
      data: {
        firstName: newFirstName,
      },
    });

    expect(response).toBeDefined();
    expect(response.id).toEqual(entity.id);
    expect(response.firstName).toEqual(newFirstName);
    expect(usersRepository.items[0].firstName).toEqual(newFirstName);
  });

  it("should be able to update a user's lastName", async () => {
    const entity = User.Entity.create({
      email: 'admin@admin.com',
      firstName: 'Admin',
      lastName: 'Topzera',
      password: 'dasdadsa',
      nickname: null,
    });

    const newLastName = 'blablaname';

    usersRepository.items[0] = entity;

    const response = await sut.execute({
      id: entity.id,
      data: {
        lastName: newLastName,
      },
    });

    expect(response).toBeDefined();
    expect(response.id).toEqual(entity.id);
    expect(response.lastName).toEqual(newLastName);
    expect(usersRepository.items[0].lastName).toEqual(newLastName);
  });

  it('should throw while trying to update a invalid user', () => {
    expect(() =>
      sut.execute({
        id: 'nf',
        data: {
          nickname: 'Not found',
        },
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
