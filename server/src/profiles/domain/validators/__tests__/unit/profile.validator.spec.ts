import { ProfileDataBuilder } from '@/profiles/domain/testing/helpers/profile.data-builder';
import {
  ProfileValidatorFactory,
  type ProfileValidator,
} from '../../profile.validator';
import { Profile } from '@/profiles/domain/entities/profile.entity';
import { ValidationError } from '@/shared/domain/errors/validation.error';

describe('Profile validator unit tests', () => {
  let sut: ProfileValidator;
  let data: Profile.Props;

  beforeEach(() => {
    data = ProfileDataBuilder.build();
    sut = ProfileValidatorFactory.create();
  });

  it('should be able to validate a profile', () => {
    expect(() => sut.validate(data)).not.toThrow();
  });

  it('should throw while trying to validate with a invalid userId', () => {
    expect(() => sut.validate({ ...data, userId: 'fake id' })).toThrow(
      ValidationError,
    );
  });

  it('should throw while trying to validate with a invalid name', () => {
    expect(() => sut.validate({ ...data, name: '1' })).toThrow(ValidationError);
  });

  it('should throw while trying to validate with a invalid document', () => {
    expect(() => sut.validate({ ...data, document: '1' })).toThrow(
      ValidationError,
    );
  });

  it('should throw while trying to validate with a invalid type', () => {
    expect(() =>
      sut.validate({ ...data, type: 'bla' as Profile.ProfileType }),
    ).toThrow(ValidationError);
  });
});
