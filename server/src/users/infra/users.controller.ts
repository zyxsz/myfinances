import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { CreateUser } from '../app/use-cases/create-user.use-case';
import { SignupDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthService } from '@/auth/infra/auth.service';

@Controller('users')
export class UsersController {
  @Inject()
  private authService: AuthService;

  @Inject()
  private createUserUseCase: CreateUser.UseCase;

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() body: SignupDto) {
    const user = await this.createUserUseCase.execute(body);

    const token = await this.authService.generateToken(user.id);

    return { accessToken: token };
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {}
}
