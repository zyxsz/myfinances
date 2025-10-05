import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';
import { Release } from '../../release.entity';

describe('Release entity unit tests', () => {
  let sut: Release.Entity;

  beforeEach(() => {
    sut = Release.Entity.create(ReleaseDataBuilder.build());
  });

  it('should be able to create a new release entity', () => {
    expect(sut).toBeDefined();
  });

  it('should revalidate when name field change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.name = 'name2';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });
});
