import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUser } from '../app/use-cases/create-user.use-case';
import { SignupDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthService } from '@/auth/infra/auth.service';
import { SignIn } from '../app/use-cases/sign-in.use-case';
import { AuthenticatedRoute } from '@/auth/infra/decorators/authenticated-route.decorator';
import { AuthenticatedUser } from '@/auth/infra/decorators/authenticated-user.decorator';
import { GetUser } from '../app/use-cases/get-user.use-case';
import { UpdateUserDto } from './dtos/update-user.dot';
import { UpdateUser } from '../app/use-cases/update-user.use-case';

@Controller('users')
export class UsersController {
  @Inject()
  private authService: AuthService;

  @Inject()
  private createUserUseCase: CreateUser.UseCase;

  @Inject()
  private signInUseCase: SignIn.UseCase;

  @Inject()
  private getUserUseCase: GetUser.UseCase;

  @Inject()
  private updateUserUseCase: UpdateUser.UseCase;

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() body: SignupDto) {
    const user = await this.createUserUseCase.execute(body);

    const token = await this.authService.generateToken(user.id);

    return { accessToken: token };
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    const user = await this.signInUseCase.execute({
      email: body.email,
      password: body.password,
    });

    const token = await this.authService.generateToken(user.id);

    return { accessToken: token };
  }

  @Get('/me')
  @HttpCode(200)
  @AuthenticatedRoute()
  async getAuthenticatedUser(@AuthenticatedUser() userId: string) {
    const user = await this.getUserUseCase.execute({ id: userId });

    return user;
  }

  @Patch('/')
  @HttpCode(200)
  @AuthenticatedRoute()
  async updateUser(
    @Body() body: UpdateUserDto,
    @AuthenticatedUser() userId: string,
  ) {
    await this.updateUserUseCase.execute({ id: userId, data: body });
  }
}
