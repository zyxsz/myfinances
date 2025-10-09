import { ReleasesInMemoryRepository } from "@/releases/infra/database/in-memory/releases.in-memory.repository";
import { GetReleasesWithPagination } from "../../get-releases-with-pagination.use-case";
import { ReleaseDataBuilder } from "@/releases/domain/testing/helpers/release.data-builder";
import { Release } from "@/releases/domain/entities/release.entity";
import { randomUUID } from "node:crypto";
import { GetReleasesValue } from "../../get-releases-value.use-case";

describe('Get releases value use-case unit tests', () => {
  let sut: GetReleasesValue.UseCase;
  let repository: ReleasesInMemoryRepository;
  let profileId: string;

  beforeEach(() => {
    repository = new ReleasesInMemoryRepository();
    sut = new GetReleasesValue.UseCase(repository);
    profileId = randomUUID();
  });

  it('should be able to get releases total value', async () => {
    const total = 9999 * 3

    const entity1 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: profileId, valueInCents: 9999,
        type: 'INCOME'
      }),
    );
    const entity2 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: profileId, valueInCents: 9999,
        type: 'INCOME'
      }),
    );
    const entity3 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: profileId,
        valueInCents: 9999,
        type: 'INCOME'
      }),
    );
    repository.items = [entity1, entity2, entity3];

    const spyOnFindManyByProfileIdAndPeriodAndType = jest.spyOn(
      repository,
      'findManyByProfileIdAndPeriodAndType',
    );

    const response = await sut.execute({
      profileId: profileId,
      period: 30,
      type: 'INCOME'
    });

    expect(response.totalValueInCents).toEqual(total);

    expect(spyOnFindManyByProfileIdAndPeriodAndType).toHaveBeenCalledTimes(1);
    expect(spyOnFindManyByProfileIdAndPeriodAndType).toHaveBeenLastCalledWith(
      profileId,
      30, 'INCOME'
    );
  });


})