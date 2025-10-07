import { ReleasesInMemoryRepository } from '@/releases/infra/database/in-memory/releases.in-memory.repository';
import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';
import { Release } from '@/releases/domain/entities/release.entity';
import { GetRecentRelease } from '../../get-recent-releases.use-case';
import { randomUUID } from 'node:crypto';
import { addDays } from 'date-fns';

describe('Get recent releases use-case unit tests', () => {
  let sut: GetRecentRelease.UseCase;
  let repository: ReleasesInMemoryRepository;
  let profileId: string;
  let defaultLimit = 15;

  beforeEach(() => {
    profileId = randomUUID();
    repository = new ReleasesInMemoryRepository();

    const entity1 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId,
        createdAt: addDays(new Date(), -5),
      }),
    );
    const entity2 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId,
        createdAt: addDays(new Date(), -15),
      }),
    );
    const entity3 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: randomUUID(),
        createdAt: addDays(new Date(), -18),
      }),
    );
    const entity4 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId,
        createdAt: addDays(new Date(), -77),
      }),
    );

    repository.items = [entity1, entity2, entity3, entity4];

    sut = new GetRecentRelease.UseCase(repository);
  });

  it('should be able to get recent releases with period', async () => {
    const profileId = randomUUID();

    const entity1 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId,
        createdAt: addDays(new Date(), -5),
      }),
    );
    const entity2 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId,
        createdAt: addDays(new Date(), -15),
      }),
    );
    const entity3 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: randomUUID(),
        createdAt: addDays(new Date(), -18),
      }),
    );
    const entity4 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId,
        createdAt: addDays(new Date(), -77),
      }),
    );

    repository.items = [entity1, entity2, entity3, entity4];

    const spyOnFindById = jest.spyOn(
      repository,
      'findRecentByProfileIdWithPeriod',
    );

    await sut.execute({
      profileId,
      period: 30,
    });

    expect(spyOnFindById).toHaveBeenCalledTimes(1);
    expect(spyOnFindById).toHaveBeenLastCalledWith(profileId, defaultLimit, 30);
  });

  it('should be able to get recent releases without period', async () => {
    const spyOnFindById = jest.spyOn(
      repository,
      'findRecentByProfileIdWithPeriod',
    );

    await sut.execute({
      profileId,
      period: undefined,
    });

    expect(spyOnFindById).toHaveBeenCalledTimes(1);
    expect(spyOnFindById).toHaveBeenLastCalledWith(
      profileId,
      defaultLimit,
      undefined,
    );
  });
});
