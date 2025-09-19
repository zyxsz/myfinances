import { ProfilesInMemoryRepository } from '@/profiles/infra/database/in-memory/profiles.in-memory.repository';
import { UpdateProfile } from '../../update-profile.use-case';
import { User } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user.data-builder';
import { Profile } from '@/profiles/domain/entities/profile.entity';
import { ProfileDataBuilder } from '@/profiles/domain/testing/helpers/profile.data-builder';

describe('Update profile use-case unit tests', () => {
  let sut: UpdateProfile.UseCase;
  let repository: ProfilesInMemoryRepository;

  beforeEach(() => {
    repository = new ProfilesInMemoryRepository();
    sut = new UpdateProfile.UseCase(repository);
  });

  it('should be able to update profile name', async () => {
    const updateSpyOn = jest.spyOn(repository, 'update');
    const user = User.Entity.create(UserDataBuilder.build());

    const profileProps = ProfileDataBuilder.build({ userId: user.id });
    const profile = Profile.Entity.create(profileProps);

    repository.items[0] = profile;

    const response = sut.execute({
      profileId: profile.id,
      userId: user.id,
      name: 'new name',
    });

    expect(response).resolves.not.toThrow();
    expect((await response).name).toEqual('new name');
    expect(updateSpyOn).toHaveBeenCalledTimes(1);
  });

  it('should be able to update profile document', async () => {
    const updateSpyOn = jest.spyOn(repository, 'update');
    const user = User.Entity.create(UserDataBuilder.build());

    const profileProps = ProfileDataBuilder.build({ userId: user.id });
    const profile = Profile.Entity.create(profileProps);

    repository.items[0] = profile;

    const response = sut.execute({
      profileId: profile.id,
      userId: user.id,
      document: '00000000022',
    });

    expect(response).resolves.not.toThrow();
    expect((await response).document).toEqual('00000000022');
    expect(updateSpyOn).toHaveBeenCalledTimes(1);
  });

  it('should be able to update profile type', async () => {
    const updateSpyOn = jest.spyOn(repository, 'update');
    const user = User.Entity.create(UserDataBuilder.build());

    const profileProps = ProfileDataBuilder.build({ userId: user.id });
    const profile = Profile.Entity.create(profileProps);

    repository.items[0] = profile;

    const response = sut.execute({
      profileId: profile.id,
      userId: user.id,
      type: 'PJ',
    });

    expect(response).resolves.not.toThrow();
    expect((await response).type).toEqual('PJ');
    expect(updateSpyOn).toHaveBeenCalledTimes(1);
  });
});
