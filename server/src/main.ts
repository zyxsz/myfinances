import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/infra/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);

  const port = configService.getValue('port');
  await app.listen(port ?? 3333);
}
bootstrap();
