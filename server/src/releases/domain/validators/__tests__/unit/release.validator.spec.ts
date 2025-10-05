import { Release } from '@/releases/domain/entities/release.entity';
import {
  ReleaseValidator,
  ReleaseValidatorFactory,
} from '../../release.validator';
import { ReleaseDataBuilder } from '@/releases/domain/testing/helpers/release.data-builder';
import { ValidationError } from '@/shared/domain/errors/validation.error';

describe('Release validator unit tests', () => {
  let sut: ReleaseValidator;

  beforeEach(() => {
    sut = ReleaseValidatorFactory.create();
  });

  it('should be able to validate a release', () => {
    expect(() => sut.validate(ReleaseDataBuilder.build())).not.toThrow();
  });

  it('should throw while trying to validate with a invalid profileId', () => {
    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ profileId: 0 as any })),
    ).toThrow(ValidationError);
  });

  it('should throw while trying to validate with a invalid name', () => {
    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ name: 12 as any })),
    ).toThrow(ValidationError);

    expect(() => sut.validate(ReleaseDataBuilder.build({ name: '1' }))).toThrow(
      ValidationError,
    );

    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ name: '1'.repeat(65) })),
    ).toThrow(ValidationError);
  });

  it('should throw while trying to validate with a invalid description', () => {
    expect(() => sut.validate(ReleaseDataBuilder.build({ name: '1' }))).toThrow(
      ValidationError,
    );

    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ name: '1'.repeat(129) })),
    ).toThrow(ValidationError);
  });

  it('should throw while trying to validate with a invalid valueInCents', () => {
    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ valueInCents: '1' as any })),
    ).toThrow(ValidationError);

    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ valueInCents: 0.2 })),
    ).toThrow(ValidationError);
  });

  it('should throw while trying to validate with a invalid type', () => {
    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ type: 'invalidType' as any })),
    ).toThrow(ValidationError);
  });

  it('should throw while trying to validate with a invalid madeAt', () => {
    expect(() =>
      sut.validate(ReleaseDataBuilder.build({ madeAt: 'not_A_Date' as any })),
    ).toThrow(ValidationError);
  });
});
