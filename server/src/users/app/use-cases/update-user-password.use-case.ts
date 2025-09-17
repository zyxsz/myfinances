import type { HashProvider } from '@/shared/app/providers/hash.provider';
import { BaseUseCase } from '@/shared/app/use-cases/base.use-case';
import type { UsersRepository } from '@/users/domain/repositories/users.repository';

export namespace UpdateUserPassword {
  export interface Input {
    id: string;

    password: string;
  }

  export type Output = void;

  export class UseCase extends BaseUseCase<Input, Output> {
    constructor(
      private usersRepository: UsersRepository,
      private hashProvider: HashProvider,
    ) {
      super();
    }

    async execute(input: Input): Promise<void> {
      const user = await this.usersRepository.findById(input.id);

      const passwordHash = await this.hashProvider.hash(input.password);

      user.password = passwordHash;

      await this.usersRepository.update(user);
    }
  }
}
