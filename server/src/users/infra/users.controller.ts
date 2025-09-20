import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { CreateUser } from '../app/use-cases/create-user.use-case';
import { SignupDto } from './dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos/signin.dto';

@Controller('users')
export class UsersController {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private createUserUseCase: CreateUser.UseCase;

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() body: SignupDto) {
    const user = await this.createUserUseCase.execute(body);

    const token = await this.jwtService.signAsync(
      {
        userId: user.id,
      },
      { expiresIn: '7d' },
    );

    return { accessToken: token };
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {}
}
