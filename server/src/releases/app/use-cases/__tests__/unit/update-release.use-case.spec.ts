import { ReleasesInMemoryRepository } from '@/releases/infra/database/in-memory/releases.in-memory.repository';
import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';
import { Release } from '@/releases/domain/entities/release.entity';
import { UpdateRelease } from '../../update-release.use-case';

describe('Update release use-case unit tests', () => {
  let sut: UpdateRelease.UseCase;
  let repository: ReleasesInMemoryRepository;

  beforeEach(() => {
    repository = new ReleasesInMemoryRepository();
    sut = new UpdateRelease.UseCase(repository);
  });

  it('should be able to update a release', async () => {
    const data = ReleaseDataBuilder.build();
    const release = Release.Entity.create(data);

    repository.items[0] = release;

    const spyOnFindById = jest.spyOn(repository, 'update');

    const newData = {
      name: 'newName',
      description: 'newDescription',
      madeAt: new Date(),
      type: 'INVESTMENT',
      valueInCents: 9999,
    };

    const response = await sut.execute({
      releaseId: release.id,
      data: newData as UpdateRelease.Input['data'],
    });

    expect(response).toBeDefined();
    expect(spyOnFindById).toHaveBeenCalledTimes(1);
    expect(repository.items[0].name).toEqual(newData.name);
    expect(repository.items[0].description).toEqual(newData.description);
    expect(repository.items[0].madeAt).toEqual(newData.madeAt);
    expect(repository.items[0].type).toEqual(newData.type);
    expect(repository.items[0].valueInCents).toEqual(newData.valueInCents);
  });
});
