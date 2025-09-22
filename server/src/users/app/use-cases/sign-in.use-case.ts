import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import { UserOutputMapper, type UserOutput } from '../dtos/user-output.dto';
import type { UsersRepository } from '@/users/domain/repositories/users.repository';
import type { HashProvider } from '@/shared/app/providers/hash.provider';
import { BadRequestException } from '@nestjs/common';
import { InvalidPasswordError } from '@/shared/app/errors/invalid-password.error';

export namespace SignIn {
  export interface Input {
    email: string;
    password: string;
  }

  export interface Output extends UserOutput {}

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(
      private usersRepository: UsersRepository,
      private hashProvider: HashProvider,
    ) {
      super();
    }

    async execute(input: Input): Promise<Output> {
      const user = await this.usersRepository.findByEmail(input.email);

      const isPasswordValid = await this.hashProvider.compare(
        input.password,
        user.password,
      );

      if (!isPasswordValid) throw new InvalidPasswordError('Invalid password');

      return UserOutputMapper.toOutput(user);
    }
  }
}
