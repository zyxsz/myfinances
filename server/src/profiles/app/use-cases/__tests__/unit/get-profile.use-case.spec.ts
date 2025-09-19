import { ProfilesInMemoryRepository } from '@/profiles/infra/database/in-memory/profiles.in-memory.repository';
import { GetProfile } from '../../get-profile.use-case';
import { Profile } from '@/profiles/domain/entities/profile.entity';
import { ProfileDataBuilder } from '@/profiles/domain/testing/helpers/profile.data-builder';
import { User } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user.data-builder';

describe('Get profile use-case unit tests', () => {
  let sut: GetProfile.UseCase;
  let repository: ProfilesInMemoryRepository;

  beforeEach(() => {
    repository = new ProfilesInMemoryRepository();
    sut = new GetProfile.UseCase(repository);
  });

  it('should be able to get a profile', async () => {
    const user = User.Entity.create(UserDataBuilder.build());
    const profile = Profile.Entity.create(
      ProfileDataBuilder.build({ userId: user.id }),
    );

    repository.items = [
      Profile.Entity.create(ProfileDataBuilder.build()),
      profile,
      Profile.Entity.create(ProfileDataBuilder.build()),
    ];

    const response = await sut.execute({
      profileId: profile.id,
      userId: user.id,
    });

    expect(response).toBeDefined();
    expect(response.id).toEqual(profile.id);
    expect(response.name).toEqual(profile.name);
    expect(response.userId).toEqual(user.id);
  });
});
