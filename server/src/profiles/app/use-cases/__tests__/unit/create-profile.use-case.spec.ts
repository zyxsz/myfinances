import { ProfilesInMemoryRepository } from '@/profiles/infra/database/in-memory/profiles.in-memory.repository';
import { CreateProfile } from '../../create-profile.use-case';
import { User } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user.data-builder';

describe('Create profile use-case unit tests', () => {
  let sut: CreateProfile.UseCase;
  let repository: ProfilesInMemoryRepository;

  beforeEach(() => {
    repository = new ProfilesInMemoryRepository();
    sut = new CreateProfile.UseCase(repository);
  });

  it('should be able to create a new profile', async () => {
    const repositoryInsertSpyOn = jest.spyOn(repository, 'insert');
    const user = User.Entity.create(UserDataBuilder.build());

    const input = {
      userId: user.id,
      document: null,
      name: 'PJ 01',
      type: 'PJ' as const,
    };

    const response = await sut.execute(input);

    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
    expect(response.name).toEqual(input.name);
    expect(response.type).toEqual(input.type);
    expect(response.document).toEqual(input.document);
    expect(response.userId).toEqual(input.userId);
    expect(repositoryInsertSpyOn).toHaveBeenCalledTimes(1);
  });
});
