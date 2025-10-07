import { ReleasesInMemoryRepository } from '@/releases/infra/database/in-memory/releases.in-memory.repository';
import { CreateRelease } from '../../create-release.use-case';
import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';

describe('Create release use-case unit tests', () => {
  let sut: CreateRelease.UseCase;
  let repository: ReleasesInMemoryRepository;

  beforeEach(() => {
    repository = new ReleasesInMemoryRepository();
    sut = new CreateRelease.UseCase(repository);
  });

  it('should be able to create a new release', async () => {
    const data = ReleaseDataBuilder.build();

    const spyOnInsert = jest.spyOn(repository, 'insert');

    const response = await sut.execute({
      profileId: data.profileId,
      description: data.description,
      name: data.name,
      madeAt: data.madeAt,
      type: data.type,
      valueInCents: data.valueInCents,
    });

    expect(response).toBeDefined();
    expect(response.name).toEqual(data.name);
    expect(spyOnInsert).toHaveBeenCalledTimes(1);
  });
});
