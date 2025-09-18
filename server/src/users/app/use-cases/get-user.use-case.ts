import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import { UserOutputMapper, type UserOutput } from '../dtos/user-output.dto';
import type { UsersRepository } from '@/users/domain/repositories/users.repository';

export namespace GetUser {
  export interface Input {
    id: string;
  }

  export interface Output extends UserOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(private usersRepository: UsersRepository) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const user = await this.usersRepository.findById(input.id);

      return UserOutputMapper.toOutput(user);
    }
  }
}
