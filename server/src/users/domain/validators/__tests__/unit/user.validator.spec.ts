import { ValidationError } from '@/shared/domain/errors/validation.error';
import { UserValidator } from '../../user.validator';

describe('User validator unit tests', () => {
  let sut: UserValidator;

  beforeEach(() => {
    sut = new UserValidator();
  });

  it('should be able to validate data', () => {
    const data = {
      nickname: null,
      email: 'admin@admin.com',
      firstName: 'Meu',
      lastName: 'Deuss',
      password: 'aaaaaaa',
    };

    const response = sut.validate(data);

    expect(response).toBeDefined();
  });

  it('should throw while validating with invalid email', () => {
    const data = {
      nickname: null,
      email: '1',
      firstName: 'Meu',
      lastName: 'Deuss',
      password: 'aaaaaaa',
    };

    expect(() => sut.validate(data)).toThrow(ValidationError);
  });

  it('should throw while validating with invalid firstName', () => {
    const data = {
      nickname: null,
      email: 'admin@admin.com',
      firstName: 'a!',
      lastName: 'Deuss',
      password: 'aaaaaaa',
    };

    expect(() => sut.validate(data)).toThrow(ValidationError);
  });

  it('should throw while validating with invalid lastName', () => {
    const data = {
      nickname: null,
      email: 'admin@admin.com',
      firstName: 'abc',
      lastName: 'd',
      password: 'aaaaaaa',
    };

    expect(() => sut.validate(data)).toThrow(ValidationError);
  });

  it('should throw while validating with invalid password', () => {
    const data = {
      nickname: null,
      email: 'admin@admin.com',
      firstName: 'abc',
      lastName: 'dddd',
      password: 'a',
    };

    expect(() => sut.validate(data)).toThrow(ValidationError);
  });

  it('should throw while validating with invalid password', () => {
    const data = {
      nickname: 'a',
      email: 'admin@admin.com',
      firstName: 'abc',
      lastName: 'dddd',
      password: 'addsds',
    };

    expect(() => sut.validate(data)).toThrow(ValidationError);
  });
});
