import { User } from '../../user.entity';

describe('User entity unit tests', () => {
  let sut: User.Entity;

  beforeEach(() => {
    sut = User.Entity.create({
      email: 'admin@admin.com',
      firstName: 'Bla',
      lastName: 'bla bla',
      nickname: null,
      password: 'dasdadsa',
    });
  });

  it('should be able to create a new user entity', () => {
    expect(sut).toBeDefined();
  });

  it('should revalidate when email change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.email = 'admin2@admin.com';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should revalidate when firstName change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.firstName = 'John';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should revalidate when lastName change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.lastName = 'Doe';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should revalidate when nickname change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.nickname = 'jd';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });

  it('should revalidate when password change', () => {
    const spyOn = jest.spyOn(sut, 'validate');

    sut.password = 'jdsahjdashj';

    expect(spyOn).toHaveBeenCalledTimes(1);
  });
});
