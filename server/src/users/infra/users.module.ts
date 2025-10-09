import { Module } from '@nestjs/common';
import { UsersRepository } from '../domain/repositories/users.repository';
import { UsersInMemoryRepository } from './database/in-memory/users.in-memory.repository';
import { CreateUser } from '../app/use-cases/create-user.use-case';
import { HashProvider } from '@/shared/app/providers/hash.provider';
import { BcryptJsHashProvider } from './providers/bcryptjs-hash.provider';
import { UsersController } from './users.controller';
import { AuthModule } from '@/auth/infra/auth.module';
import { SignIn } from '../app/use-cases/sign-in.use-case';
import { GetUser } from '../app/use-cases/get-user.use-case';
import { UpdateUser } from '../app/use-cases/update-user.use-case';
import { MongooseModule } from '@/shared/infra/database/mongoose/mongoose.module';
import { UsersPrismaRepository } from './database/prisma/users.prisma.repository';
import { PrismaModule } from '@/shared/infra/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule, MongooseModule, AuthModule],
  controllers: [UsersController],
  providers: [
    { provide: UsersRepository, useClass: UsersPrismaRepository },
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
    {
      provide: GetUser.UseCase,
      useFactory: (repository: UsersRepository) => {
        return new GetUser.UseCase(repository);
      },
      inject: [UsersRepository],
    },
    {
      provide: UpdateUser.UseCase,
      useFactory: (repository: UsersRepository) => {
        return new UpdateUser.UseCase(repository);
      },
      inject: [UsersRepository],
    },
  ],
})
export class UsersModule { }
