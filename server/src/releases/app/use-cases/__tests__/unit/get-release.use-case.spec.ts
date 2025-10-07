import { ReleasesInMemoryRepository } from '@/releases/infra/database/in-memory/releases.in-memory.repository';
import { CreateRelease } from '../../create-release.use-case';
import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';
import { GetRelease } from '../../get-release.use-case';
import { Release } from '@/releases/domain/entities/release.entity';

describe('Get release use-case unit tests', () => {
  let sut: GetRelease.UseCase;
  let repository: ReleasesInMemoryRepository;

  beforeEach(() => {
    repository = new ReleasesInMemoryRepository();
    sut = new GetRelease.UseCase(repository);
  });

  it('should be able to get a release', async () => {
    const data = ReleaseDataBuilder.build();
    const release = Release.Entity.create(data);

    repository.items[0] = release;

    const spyOnFindById = jest.spyOn(repository, 'findById');

    const response = await sut.execute({
      releaseId: release.id,
    });

    expect(response).toBeDefined();
    expect(spyOnFindById).toHaveBeenCalledTimes(1);
  });
});
