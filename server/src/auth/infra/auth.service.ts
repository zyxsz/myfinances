import { InvalidTokenError } from '@/shared/app/errors/invalid-token.error';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AuthService {
  @Inject()
  private jwtService: JwtService;

  async generateToken(userId: string): Promise<string> {
    const jwtToken = await this.jwtService.signAsync({ userId });

    return jwtToken;
  }

  async verifyToken(token: string): Promise<{ userId: string }> {
    try {
      const payload = await this.jwtService.verifyAsync<{ userId: string }>(
        token,
      );

      return {
        userId: payload.userId,
      };
    } catch (err) {
      throw new InvalidTokenError('Unable to verify token');
    }
  }
}
