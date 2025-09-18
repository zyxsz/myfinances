import { SchemaValidator } from '@/shared/domain/validators/schema-validator';
import z from 'zod';

export const profileSchema = z.object({
  userId: z.uuid(),
  name: z.string().min(2).max(64),
  document: z.string().min(11).max(14).nullable(),
  type: z.enum(['PJ', 'PF']),
});

export class ProfileValidator extends SchemaValidator {
  validate(data: z.infer<typeof profileSchema>) {
    return super.validateSchema(data, profileSchema);
  }
}

export class ProfileValidatorFactory {
  static create() {
    return new ProfileValidator();
  }
}
