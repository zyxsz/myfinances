import { ProfilesInMemoryRepository } from '@/profiles/infra/database/in-memory/profiles.in-memory.repository';
import { GetManyProfiles } from '../../get-many-profiles.use-case';
import { randomUUID } from 'node:crypto';

describe('Get many profiles use-case unit tests', () => {
  let sut: GetManyProfiles.UseCase;
  let repository: ProfilesInMemoryRepository;

  beforeEach(() => {
    repository = new ProfilesInMemoryRepository();
    sut = new GetManyProfiles.UseCase(repository);
  });

  it('should be able to get many profiles', async () => {
    const findManySpyOn = jest.spyOn(repository, 'findManyByUserId');

    const userId = randomUUID();

    const response = await sut.execute({ userId });

    expect(response).toEqual([]);
    expect(findManySpyOn).toHaveBeenCalledTimes(1);
  });
});
