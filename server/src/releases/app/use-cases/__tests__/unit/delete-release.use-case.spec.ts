import { ReleasesInMemoryRepository } from '@/releases/infra/database/in-memory/releases.in-memory.repository';
import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';
import { Release } from '@/releases/domain/entities/release.entity';
import { DeleteRelease } from '../../delete-release.use-case';

describe('Delete release use-case unit tests', () => {
  let sut: DeleteRelease.UseCase;
  let repository: ReleasesInMemoryRepository;

  beforeEach(() => {
    repository = new ReleasesInMemoryRepository();
    sut = new DeleteRelease.UseCase(repository);
  });

  it('should be able to delete a release', async () => {
    const data = ReleaseDataBuilder.build();
    const release = Release.Entity.create(data);

    repository.items[0] = release;

    const spyOnFindById = jest.spyOn(repository, 'delete');

    await expect(() =>
      sut.execute({
        releaseId: release.id,
      }),
    ).resolves.not.toThrow();
    expect(spyOnFindById).toHaveBeenCalledTimes(1);
  });
});
