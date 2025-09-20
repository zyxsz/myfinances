import { ConflictError } from '@/shared/app/errors/conflict.error';
import { HashProvider } from '@/shared/app/providers/hash.provider';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import { User } from '@/users/domain/entities/user.entity';
import { UsersRepository } from '@/users/domain/repositories/users.repository';
import type { UserOutput } from '../dtos/user-output.dto';

export namespace CreateUser {
  export interface Input {
    nickname: string | null;
    email: string;
    firstName: string;
    lastName: string;
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
      const alreadyExistsUser = await this.usersRepository
        .findByEmail(input.email)
        .catch(() => null);

      if (alreadyExistsUser !== null)
        throw new ConflictError('User already exists');

      const passwordHash = await this.hashProvider.hash(input.password);

      const user = User.Entity.create({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        nickname: input.nickname,
        password: passwordHash,
      });

      await this.usersRepository.insert(user);

      return {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      };
    }
  }
}
