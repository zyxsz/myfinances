import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth.service';
import { ConfigModule } from '@/shared/infra/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@/shared/infra/config/config.service';
import { InvalidTokenError } from '@/shared/app/errors/invalid-token.error';

describe('Auth service unit tests', () => {
  let sut: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            global: true,
            secret: configService.getValue('secret'),
            signOptions: { expiresIn: '7d' },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService],
    }).compile();

    sut = moduleRef.get(AuthService);
  });

  it('should be able to generate a new token', async () => {
    const token = await sut.generateToken('1');

    expect(token).toBeDefined();
  });

  it('should be able to verify a valid token', async () => {
    const userId = '1';
    const token = await sut.generateToken(userId);
    const payload = await sut.verifyToken(token);

    expect(token).toBeDefined();
    expect(payload).toStrictEqual({
      userId,
    });
  });

  it('should throw while trying to validate a invalid token', () => {
    expect(() => sut.verifyToken('invalidToken')).rejects.toThrow(
      InvalidTokenError,
    );
  });
});
