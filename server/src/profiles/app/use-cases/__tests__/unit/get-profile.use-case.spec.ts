import { ProfilesInMemoryRepository } from '@/profiles/infra/database/in-memory/profiles.in-memory.repository';
import { GetProfile } from '../../get-profile.use-case';
import { Profile } from '@/profiles/domain/entities/profile.entity';
import { ProfileDataBuilder } from '@/profiles/domain/testing/helpers/profile.data-builder';

describe('Get profile use-case unit tests', () => {
  let sut: GetProfile.UseCase;
  let repository: ProfilesInMemoryRepository;

  beforeEach(() => {
    repository = new ProfilesInMemoryRepository();
    sut = new GetProfile.UseCase(repository);
  });

  it('should be able to get a profile', async () => {
    const profile = Profile.Entity.create(ProfileDataBuilder.build());

    repository.items = [
      Profile.Entity.create(ProfileDataBuilder.build()),
      profile,
      Profile.Entity.create(ProfileDataBuilder.build()),
    ];

    const response = await sut.execute({ profileId: profile.id });

    expect(response).toBeDefined();
    expect(response.id).toEqual(profile.id);
    expect(response.name).toEqual(profile.name);
  });
});
