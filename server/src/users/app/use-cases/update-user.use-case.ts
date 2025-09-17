import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import { UserOutputMapper, type UserOutput } from '../dtos/user-output.dto';
import type { UsersRepository } from '@/users/domain/repositories/users.repository';

export namespace UpdateUser {
  export interface Input {
    id: string;

    nickname?: string | null;
    firstName?: string;
    lastName?: string;
  }

  export interface Output extends UserOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private usersRepository: UsersRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const user = await this.usersRepository.findById(input.id);

      if (input.nickname) user.nickname = input.nickname;
      if (input.firstName) user.firstName = input.firstName;
      if (input.lastName) user.lastName = input.lastName;

      await this.usersRepository.update(user);

      return UserOutputMapper.toOutput(user);
    }
  }
}
