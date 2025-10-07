import { ReleasesInMemoryRepository } from '../../releases.in-memory.repository';
import { Release } from '@/releases/domain/entities/release.entity';
import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';
import { addDays } from 'date-fns';
import { randomUUID } from 'node:crypto';

describe('Releases in-memory repository unit tests', () => {
  let sut: ReleasesInMemoryRepository;
  let globalProfileId: string;

  beforeEach(() => {
    sut = new ReleasesInMemoryRepository();
    globalProfileId = randomUUID();
  });

  it('should be able to find recent records with period', async () => {
    const entity1 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -5),
      }),
    );
    const entity2 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
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
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -77),
      }),
    );

    sut.items = [entity1, entity2, entity3, entity4];

    const response = await sut.findRecentByProfileIdWithPeriod(
      globalProfileId,
      5,
      30,
    );

    expect(response.length).toEqual(2);
    expect(response[0].id).toEqual(entity1.id);
    expect(response[1].id).toEqual(entity2.id);
  });

  it('should be able to find recent records with period and limit', async () => {
    const entity1 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -5),
      }),
    );
    const entity2 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -15),
      }),
    );
    const entity3 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -35),
      }),
    );
    const entity4 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -77),
      }),
    );

    sut.items = [entity1, entity2, entity3, entity4];

    const response = await sut.findRecentByProfileIdWithPeriod(
      globalProfileId,
      1,
      30,
    );

    expect(response.length).toEqual(1);
    expect(response[0].id).toEqual(entity1.id);
  });

  it('should be able to find recent records without period', async () => {
    const entity1 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -5),
      }),
    );
    const entity2 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -15),
      }),
    );
    const entity3 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -35),
      }),
    );
    const entity4 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: globalProfileId,
        createdAt: addDays(new Date(), -77),
      }),
    );

    sut.items = [entity1, entity2, entity3, entity4];

    const response = await sut.findRecentByProfileIdWithPeriod(
      globalProfileId,
      5,
    );

    expect(response.length).toEqual(4);
  });
});
