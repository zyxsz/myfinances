import z from 'zod';
import { ValidationError } from '../errors/validation.error';

export class SchemaValidator {
  validateSchema<S>(data: z.infer<S>, schema: z.ZodType<S>) {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          'Validation failed',
          error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        );
      }

      throw Error('Schema validator throw n/f error');
    }
  }
}
