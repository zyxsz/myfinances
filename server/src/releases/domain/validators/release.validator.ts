import { SchemaValidator } from '@/shared/domain/validators/schema-validator';
import z from 'zod';

export const releaseSchema = z.object({
  profileId: z.uuid(),

  name: z.string().min(2).max(64),
  description: z.string().min(2).max(128).nullable(),

  valueInCents: z.number().int().min(0.01).max(999_999_999),
  type: z.enum(['INCOME', 'OUTCOME', 'INVESTMENT']),

  madeAt: z.coerce.date().nullable(),
});

export type ReleaseSchema = z.infer<typeof releaseSchema>;

export class ReleaseValidator extends SchemaValidator {
  validate(data: z.infer<typeof releaseSchema>) {
    return super.validateSchema(data, releaseSchema);
  }
}

export class ReleaseValidatorFactory {
  static create() {
    return new ReleaseValidator();
  }
}
