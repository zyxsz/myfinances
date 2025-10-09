import { ReleasesInMemoryRepository } from "@/releases/infra/database/in-memory/releases.in-memory.repository";
import { GetReleasesWithPagination } from "../../get-releases-with-pagination.use-case";
import { ReleaseDataBuilder } from "@/releases/domain/testing/helpers/release.data-builder";
import { Release } from "@/releases/domain/entities/release.entity";
import { randomUUID } from "node:crypto";

describe('GetReleasesWithPaginationUseCase', () => {
  let sut: GetReleasesWithPagination.UseCase;
  let repository: ReleasesInMemoryRepository;
  let profileId: string;

  beforeEach(() => {
    repository = new ReleasesInMemoryRepository();
    sut = new GetReleasesWithPagination.UseCase(repository);
    profileId = randomUUID();
  });

  it('should be able to get releases with pagination', async () => {
    const entity1 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: profileId,
      }),
    );
    const entity2 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: profileId,
      }),
    );
    const entity3 = Release.Entity.create(
      ReleaseDataBuilder.build({
        profileId: profileId,
      }),
    );
    repository.items = [entity1, entity2, entity3];

    const spyOnFindManyByProfileIdWithPagination = jest.spyOn(
      repository,
      'findManyByProfileIdWithPagination',
    );

    const response = await sut.execute({
      profileId: profileId,
      page: 1,
      limitPerPage: 2,
    });

    expect(response.data.length).toEqual(2);
    expect(response.pagination.currentPage).toEqual(1);
    expect(spyOnFindManyByProfileIdWithPagination).toHaveBeenCalledTimes(1);
    expect(spyOnFindManyByProfileIdWithPagination).toHaveBeenLastCalledWith(
      profileId,
      { page: 1, limitPerPage: 2 },
    );
  });


})