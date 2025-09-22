import { SchemaValidator } from '@/shared/domain/validators/schema-validator';
import z from 'zod';
import dotenv from 'dotenv';
import path from 'node:path';

const configSchema = z.object({
  secret: z.string(),
});

type ConfigSchemaType = z.infer<typeof configSchema>;

export class ConfigService {
  private validator: SchemaValidator;
  private data: ConfigSchemaType;

  constructor() {
    this.validator = new SchemaValidator();

    const nodeEnviroment = process.env.NODE_ENV;
    const enviroment = dotenv.config({
      path: path.resolve(__dirname, '../../../..', `.env.${nodeEnviroment}`),
    });

    const validatedData = this.validator.validateSchema(
      enviroment.parsed,
      configSchema,
    );
    this.data = validatedData;
  }

  getValue(key: keyof ConfigSchemaType): ConfigSchemaType[typeof key] {
    return this.data[key];
  }

  getData() {
    return this.data;
  }
}
