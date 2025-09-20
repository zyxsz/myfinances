import { ProfilesInMemoryRepository } from '@/profiles/infra/database/in-memory/profiles.in-memory.repository';
import { DeleteProfile } from '../../delete-profile.use-case';
import { Profile } from '@/profiles/domain/entities/profile.entity';
import { ProfileDataBuilder } from '@/profiles/domain/testing/helpers/profile.data-builder';

describe('Delete profile use-case unite tests', () => {
  let sut: DeleteProfile.UseCase;
  let rep: ProfilesInMemoryRepository;

  beforeEach(() => {
    rep = new ProfilesInMemoryRepository();
    sut = new DeleteProfile.UseCase(rep);
  });

  it('should be able to delete profile', async () => {
    const deleteSpyOn = jest.spyOn(rep, 'delete');
    const profile = Profile.Entity.create(ProfileDataBuilder.build());

    rep.items[0] = profile;

    await expect(
      async () => await sut.execute({ profileId: profile.id }),
    ).resolves.not.toThrow();
    expect(deleteSpyOn).toHaveBeenCalledTimes(1);
  });
});
