import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import { UserOutputMapper, type UserOutput } from '../dtos/user-output.dto';
import type { UsersRepository } from '@/users/domain/repositories/users.repository';

export namespace UpdateUser {
  export interface Input {
    id: string;

    data: {
      nickname?: string | null;
      firstName?: string;
      lastName?: string;
    };
  }

  export interface Output extends UserOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private usersRepository: UsersRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const user = await this.usersRepository.findById(input.id);

      if (input.data.nickname) user.nickname = input.data.nickname;
      if (input.data.firstName) user.firstName = input.data.firstName;
      if (input.data.lastName) user.lastName = input.data.lastName;

      await this.usersRepository.update(user);

      return UserOutputMapper.toOutput(user);
    }
  }
}
