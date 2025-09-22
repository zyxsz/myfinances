import { Module } from '@nestjs/common';
import { UsersRepository } from '../domain/repositories/users.repository';
import { UsersInMemoryRepository } from './database/in-memory/users.in-memory.repository';
import { CreateUser } from '../app/use-cases/create-user.use-case';
import { HashProvider } from '@/shared/app/providers/hash.provider';
import { BcryptJsHashProvider } from './providers/bcryptjs-hash.provider';
import { UsersController } from './users.controller';
import { AuthModule } from '@/auth/infra/auth.module';
import { SignIn } from '../app/use-cases/sign-in.use-case';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    { provide: UsersRepository, useClass: UsersInMemoryRepository },
    { provide: HashProvider, useClass: BcryptJsHashProvider },
    {
      provide: CreateUser.UseCase,
      useFactory: (repository: UsersRepository, hashProvider: HashProvider) => {
        return new CreateUser.UseCase(repository, hashProvider);
      },
      inject: [UsersRepository, HashProvider],
    },
    {
      provide: SignIn.UseCase,
      useFactory: (repository: UsersRepository, hashProvider: HashProvider) => {
        return new SignIn.UseCase(repository, hashProvider);
      },
      inject: [UsersRepository, HashProvider],
    },
  ],
})
export class UsersModule {}
