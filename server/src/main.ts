import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './shared/infra/config/config.service';
import { MongooseService } from './shared/infra/database/mongoose/mongoose.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const mongooseService = app.get(MongooseService);
  const configService = app.get(ConfigService);

  const port = configService.getValue('port');
  await mongooseService.connect();

  await app.listen(port ?? 3333);
}
bootstrap();
