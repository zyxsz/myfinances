import type { User } from '../../entities/user.entity';

export class UserDataBuilder {
  static build(props?: Partial<User.Props>) {
    return {
      email: props?.email ?? 'example@email.com',
      firstName: props?.firstName ?? 'John',
      lastName: props?.lastName ?? 'Doe',
      nickname: props?.nickname ?? 'JD',
      password: props?.password ?? 'blablabla',
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? new Date(),
    } satisfies User.Props;
  }
}
