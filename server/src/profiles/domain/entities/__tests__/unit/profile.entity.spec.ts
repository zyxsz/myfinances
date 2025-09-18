import { ProfileDataBuilder } from '@/profiles/domain/testing/helpers/profile.data-builder';
import { Profile } from '../../profile.entity';

describe('Profile entity unit tests', () => {
  let sut: Profile.Entity;

  beforeEach(() => {
    sut = Profile.Entity.create(ProfileDataBuilder.build());
  });

  it('should be able to create a new profile entity', () => {
    expect(sut).toBeDefined();
  });

  it('should revalidate when userId field change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.userId = ProfileDataBuilder.build().userId;

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should revalidate when name field change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.name = 'New name';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should revalidate when document field change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.document = '00000000001';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should revalidate when type field change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.type = 'PF';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });
});
